/**
 * HTTP Transport Implementation
 *
 * Provides HTTP/HTTPS transport for Agent OS Protocol messages with
 * connection pooling, retry logic, and comprehensive error handling.
 */
import { EventEmitter } from 'events';
import { CoreMessage, Transport, TransportConfig, Connection, ConnectionMetrics, FlowControlConfig, FlowControlStatus } from '../types/index.js';
export type HttpTransportConfig = TransportConfig & {
    protocol: 'http' | 'https';
    hostname: string;
    port: number;
    basePath?: string;
    headers?: Record<string, string>;
    timeout?: number;
    maxRedirects?: number;
    keepAlive?: boolean;
    maxConnections?: number;
    maxSockets?: number;
    keepAliveMsecs?: number;
};
export type HttpConnection = Connection & {
    config: HttpTransportConfig;
    lastUsed: number;
    requestCount: number;
    errorCount: number;
};
export type HttpTransportState = {
    connections: Map<string, HttpConnection>;
    metrics: ConnectionMetrics;
    config: HttpTransportConfig;
    emitter: EventEmitter;
    flowControl: FlowControlConfig;
};
export declare const createHttpTransport: (config: HttpTransportConfig) => Transport;
export declare const isHttpTransport: (transport: Transport) => transport is Transport & {
    connect(endpoint: string): Promise<HttpConnection>;
};
export declare class HttpTransport extends EventEmitter implements Transport {
    private transport;
    constructor(config: HttpTransportConfig);
    connect(endpoint: string): Promise<Connection>;
    disconnect(connectionId: string): Promise<void>;
    send(message: CoreMessage): Promise<void>;
    receive(): AsyncIterable<CoreMessage>;
    acknowledge(messageId: string): Promise<void>;
    reject(messageId: string, reason: string): Promise<void>;
    setFlowControl(config: FlowControlConfig): void;
    getFlowControlStatus(): FlowControlStatus;
}
//# sourceMappingURL=http-transport.d.ts.map