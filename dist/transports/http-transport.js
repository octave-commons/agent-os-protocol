/**
 * HTTP Transport Implementation
 *
 * Provides HTTP/HTTPS transport for Agent OS Protocol messages with
 * connection pooling, retry logic, and comprehensive error handling.
 */
import { EventEmitter } from 'events';
import { TransportError, } from '../types/index.js';
// ============================================================================
// HTTP TRANSPORT FACTORY
// ============================================================================
export const createHttpTransport = (config) => {
    const state = {
        connections: new Map(),
        metrics: {
            messagesSent: 0,
            messagesReceived: 0,
            bytesTransferred: 0,
            errorCount: 0,
            averageLatency: 0,
            totalConnections: 0,
            activeConnections: 0,
            failedConnections: 0,
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            lastActivity: new Date(),
        },
        config,
        emitter: new EventEmitter(),
        flowControl: {
            rateLimit: 100,
            bufferSize: 1000,
            backpressureThreshold: 800,
        },
    };
    validateConfig(config);
    return {
        connect: (endpoint) => connect(state, endpoint),
        disconnect: (connectionId) => disconnect(state, connectionId),
        send: (message) => send(state, message),
        receive: () => receive(state),
        acknowledge: (messageId) => acknowledge(state, messageId),
        reject: (messageId, reason) => reject(state, messageId, reason),
        setFlowControl: (config) => setFlowControl(state, config),
        getFlowControlStatus: () => getFlowControlStatus(state),
    };
};
// ============================================================================
// CONNECTION MANAGEMENT
// ============================================================================
const connect = async (state, endpoint) => {
    const connectionKey = endpoint;
    // Check for existing connection
    if (state.connections.has(connectionKey)) {
        const connection = state.connections.get(connectionKey);
        if (isConnectionHealthy(connection)) {
            connection.lastUsed = Date.now();
            return connection;
        }
        // Remove unhealthy connection
        state.connections.delete(connectionKey);
        if (state.metrics.activeConnections) {
            state.metrics.activeConnections--;
        }
    }
    // Create new connection
    const connection = await createConnection(state.config, endpoint);
    state.connections.set(connectionKey, connection);
    if (state.metrics.totalConnections !== undefined) {
        state.metrics.totalConnections++;
    }
    if (state.metrics.activeConnections !== undefined) {
        state.metrics.activeConnections++;
    }
    state.emitter.emit('connected', connection);
    return connection;
};
const disconnect = async (state, connectionId) => {
    const connection = Array.from(state.connections.values()).find((conn) => conn.id === connectionId);
    if (!connection) {
        throw new TransportError(`Connection ${connectionId} not found`);
    }
    const connectionKey = getConnectionKey(connection.config);
    state.connections.delete(connectionKey);
    if (state.metrics.activeConnections !== undefined) {
        state.metrics.activeConnections--;
    }
    state.emitter.emit('disconnected', connection);
};
// ============================================================================
// MESSAGE TRANSPORT
// ============================================================================
const send = async (state, message) => {
    const endpoint = `${message.recipient.endpoint || getDefaultEndpoint(message.recipient)}`;
    try {
        const startTime = Date.now();
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...state.config.headers,
            },
            body: JSON.stringify(message),
            signal: AbortSignal.timeout(state.config.timeout || 30000),
        });
        if (!response.ok) {
            throw new TransportError(`HTTP ${response.status}: ${response.statusText}`);
        }
        // Update metrics
        const latency = Date.now() - startTime;
        updateMetrics(state, 'send', latency, true);
        state.emitter.emit('messageSent', message);
    }
    catch (error) {
        updateMetrics(state, 'send', 0, false);
        throw new TransportError('Failed to send message', { code: 'SEND_ERROR', error });
    }
};
const receive = async function* (state) {
    const messageQueue = [];
    // In a real implementation, this would listen for incoming HTTP requests
    // For now, we'll yield from a queue that gets populated elsewhere
    while (true) {
        if (messageQueue.length > 0) {
            const message = messageQueue.shift();
            updateMetrics(state, 'receive', 0, true);
            yield message;
        }
        else {
            // Wait for new messages
            await new Promise((resolve) => {
                state.emitter.once('messageReceived', resolve);
            });
        }
    }
};
// ============================================================================
// RELIABILITY FUNCTIONS
// ============================================================================
const acknowledge = async (state, messageId) => {
    // HTTP implementation would send ACK via HTTP POST
    state.emitter.emit('acknowledged', messageId);
};
const reject = async (state, messageId, reason) => {
    // HTTP implementation would send REJECT via HTTP POST
    state.emitter.emit('rejected', { messageId, reason });
};
// ============================================================================
// FLOW CONTROL
// ============================================================================
const setFlowControl = (state, config) => {
    state.flowControl = config;
    state.emitter.emit('flowControlChanged', config);
};
const getFlowControlStatus = (state) => {
    return {
        currentRate: (state.metrics.messagesSent / (Date.now() - state.metrics.lastActivity.getTime())) *
            1000,
        bufferUtilization: state.connections.size / (state.config.maxConnections || 100),
        backpressureActive: state.connections.size >= state.flowControl.backpressureThreshold,
    };
};
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
const validateConfig = (config) => {
    if (!config.hostname) {
        throw new TransportError('Hostname is required');
    }
    if (!config.port || config.port < 1 || config.port > 65535) {
        throw new TransportError('Valid port is required');
    }
};
const createConnection = async (config, endpoint) => {
    const connectionId = crypto.randomUUID();
    try {
        // Test connectivity with a simple request
        await fetch(endpoint, {
            method: 'HEAD',
            signal: AbortSignal.timeout(config.timeout || 30000),
        });
        return {
            id: connectionId,
            endpoint,
            status: 'connected',
            lastActivity: new Date(),
            metrics: {
                messagesSent: 0,
                messagesReceived: 0,
                bytesTransferred: 0,
                errorCount: 0,
                averageLatency: 0,
            },
            config,
            lastUsed: Date.now(),
            requestCount: 0,
            errorCount: 0,
        };
    }
    catch (error) {
        throw new TransportError(`Failed to create connection to ${endpoint}`, {
            code: 'CONNECTION_ERROR',
            error,
        });
    }
};
const isConnectionHealthy = (connection) => {
    const maxIdleTime = 300000; // 5 minutes
    const now = Date.now();
    return (connection.status === 'connected' &&
        now - connection.lastUsed < maxIdleTime &&
        connection.errorCount < 5);
};
const getConnectionKey = (config) => {
    return `${config.protocol}://${config.hostname}:${config.port}${config.basePath || ''}`;
};
const getDefaultEndpoint = (address) => {
    return address.endpoint || `http://${address.domain}`;
};
const updateMetrics = (state, operation, latency, success) => {
    if (operation === 'send') {
        state.metrics.messagesSent++;
        if (state.metrics.totalRequests !== undefined) {
            state.metrics.totalRequests++;
        }
        if (success && state.metrics.successfulRequests !== undefined) {
            state.metrics.successfulRequests++;
        }
        if (!success && state.metrics.failedRequests !== undefined) {
            state.metrics.failedRequests++;
        }
    }
    else {
        state.metrics.messagesReceived++;
    }
    if (latency > 0) {
        // Update average latency
        const totalLatency = state.metrics.averageLatency * (state.metrics.messagesSent - 1) + latency;
        state.metrics.averageLatency = totalLatency / state.metrics.messagesSent;
    }
    if (!success) {
        state.metrics.errorCount++;
    }
    state.metrics.lastActivity = new Date();
};
// ============================================================================
// TYPE GUARDS
// ============================================================================
export const isHttpTransport = (transport) => {
    // In a real implementation, we'd check for specific HTTP transport properties
    return transport.constructor?.name === 'HttpTransport' || false;
};
// ============================================================================
// LEGACY EXPORTS FOR BACKWARD COMPATIBILITY
// ============================================================================
export class HttpTransport extends EventEmitter {
    transport;
    constructor(config) {
        super();
        this.transport = createHttpTransport(config);
    }
    async connect(endpoint) {
        return this.transport.connect(endpoint);
    }
    async disconnect(connectionId) {
        return this.transport.disconnect(connectionId);
    }
    async send(message) {
        return this.transport.send(message);
    }
    receive() {
        return this.transport.receive();
    }
    async acknowledge(messageId) {
        return this.transport.acknowledge(messageId);
    }
    async reject(messageId, reason) {
        return this.transport.reject(messageId, reason);
    }
    setFlowControl(config) {
        this.transport.setFlowControl(config);
    }
    getFlowControlStatus() {
        return this.transport.getFlowControlStatus();
    }
}
//# sourceMappingURL=http-transport.js.map