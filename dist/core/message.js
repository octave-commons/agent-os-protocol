/**
 * Core Message Implementation
 *
 * Implements the CoreMessage type with validation, serialization,
 * and protocol operations using functional programming patterns.
 */
import { MessagePayloadSchema, MessageMetadataSchema, createCoreMessage, validateMessage, ProtocolError, ValidationError, } from '../types/index.js';
// ============================================================================
// MESSAGE FACTORY FUNCTIONS
// ============================================================================
export const createMessage = (params) => {
    const now = new Date().toISOString();
    return createCoreMessage({
        id: randomUUID(),
        version: '1.0.0',
        type: params.type,
        timestamp: now,
        sender: params.sender,
        recipient: params.recipient,
        payload: MessagePayloadSchema.parse({
            type: typeof params.payload === 'string' ? 'text' : 'json',
            data: params.payload,
            encoding: 'json',
            compression: 'none',
            size: JSON.stringify(params.payload).length,
        }),
        metadata: MessageMetadataSchema.parse({
            source: 'agent-os-protocol',
            version: '1.0.0',
            timestamp: now,
            tags: [],
            custom: {},
        }),
        headers: {},
        priority: params.priority || 'NORMAL',
        qos: params.qos || 'AT_LEAST_ONCE',
    });
};
export const createRequest = (params) => {
    return createMessage({
        type: 'REQUEST',
        sender: params.sender,
        recipient: params.recipient,
        payload: params.data,
        priority: params.priority || 'NORMAL',
    });
};
export const createResponse = (params) => {
    const message = createMessage({
        type: 'RESPONSE',
        sender: params.sender,
        recipient: params.recipient,
        payload: params.data,
        priority: params.priority || 'NORMAL',
    });
    return {
        ...message,
        correlationId: params.correlationId,
    };
};
export const createEvent = (params) => {
    return createMessage({
        type: 'EVENT',
        sender: params.sender,
        recipient: params.recipient || {
            id: 'broadcast',
            namespace: 'system',
            domain: 'global',
        },
        payload: params.data,
        priority: params.priority || 'NORMAL',
    });
};
export const createError = (params) => {
    const errorData = params.error instanceof Error
        ? { message: params.error.message, stack: params.error.stack }
        : { message: params.error };
    const message = createMessage({
        type: 'ERROR',
        sender: params.sender,
        recipient: params.recipient,
        payload: errorData,
        priority: params.priority || 'HIGH',
    });
    return {
        ...message,
        correlationId: params.correlationId,
    };
};
export const createDefaultMessageProcessor = () => ({
    async process(message) {
        if (!validateMessage(message)) {
            throw new ValidationError('Invalid message format');
        }
        switch (message.type) {
            case 'REQUEST':
                return processRequest(message);
            case 'RESPONSE':
                return processResponse(message);
            case 'EVENT':
                return processEvent(message);
            case 'ERROR':
                return processError(message);
            default:
                return null;
        }
    },
});
const processRequest = async (message) => {
    return createResponse({
        sender: message.recipient,
        recipient: message.sender,
        data: { status: 'received', timestamp: new Date().toISOString() },
        correlationId: message.id,
    });
};
const processResponse = async (message) => {
    console.log(`Received response for ${message.correlationId}`);
    return null;
};
const processEvent = async (message) => {
    console.log(`Received event: ${message.payload.type}`);
    return null;
};
const processError = async (message) => {
    console.error(`Received error: ${message.payload.data}`);
    return null;
};
// ============================================================================
// MESSAGE VALIDATION FUNCTIONS
// ============================================================================
export const validateMessageStructure = (message) => {
    const errors = [];
    // Required field validation
    if (!message.id)
        errors.push('Message ID is required');
    if (!message.type)
        errors.push('Message type is required');
    if (!message.sender)
        errors.push('Sender is required');
    if (!message.recipient)
        errors.push('Recipient is required');
    if (!message.payload)
        errors.push('Payload is required');
    // Type-specific validation
    if (message.type === 'REQUEST' && !message.payload.data) {
        errors.push('Request messages must have data in payload');
    }
    if (message.type === 'RESPONSE' && !message.correlationId) {
        errors.push('Response messages must have correlation ID');
    }
    // Address validation
    if (message.sender && !validateAddress(message.sender)) {
        errors.push('Invalid sender address');
    }
    if (message.recipient && !validateAddress(message.recipient)) {
        errors.push('Invalid recipient address');
    }
    // Timestamp validation
    if (message.timestamp) {
        const timestamp = new Date(message.timestamp);
        if (isNaN(timestamp.getTime())) {
            errors.push('Invalid timestamp format');
        }
    }
    // QoS validation
    if (message.ttl && message.ttl < 0) {
        errors.push('TTL must be positive');
    }
    return {
        valid: errors.length === 0,
        errors,
    };
};
const validateAddress = (address) => {
    return !!(address.id && address.namespace && address.domain);
};
// ============================================================================
// MESSAGE SERIALIZATION FUNCTIONS
// ============================================================================
export const serializeMessage = (message) => {
    try {
        const jsonString = JSON.stringify(message);
        return new TextEncoder().encode(jsonString);
    }
    catch (error) {
        throw new ProtocolError('Failed to serialize message', 'SERIALIZATION_ERROR', { error });
    }
};
export const deserializeMessage = (data) => {
    try {
        const jsonString = new TextDecoder().decode(data);
        const message = JSON.parse(jsonString);
        if (!validateMessage(message)) {
            throw new ValidationError('Invalid message format during deserialization');
        }
        return message;
    }
    catch (error) {
        throw new ProtocolError('Failed to deserialize message', 'DESERIALIZATION_ERROR', { error });
    }
};
export const serializeMessageToString = (message) => {
    return JSON.stringify(message, null, 2);
};
export const deserializeMessageFromString = (jsonString) => {
    try {
        const message = JSON.parse(jsonString);
        if (!validateMessage(message)) {
            throw new ValidationError('Invalid message format during string deserialization');
        }
        return message;
    }
    catch (error) {
        throw new ProtocolError('Failed to deserialize message from string', 'DESERIALIZATION_ERROR', {
            error,
        });
    }
};
// ============================================================================
// MESSAGE BUILDER FUNCTIONS
// ============================================================================
export const createMessageBuilder = (type) => {
    const message = {
        type,
        id: randomUUID(),
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    };
    return {
        sender: (address) => {
            message.sender = address;
            return builder;
        },
        recipient: (address) => {
            message.recipient = address;
            return builder;
        },
        replyTo: (address) => {
            message.replyTo = address;
            return builder;
        },
        correlationId: (id) => {
            message.correlationId = id;
            return builder;
        },
        payload: (data, type = 'json') => {
            message.payload = MessagePayloadSchema.parse({
                type,
                data,
                encoding: 'json',
                compression: 'none',
                size: JSON.stringify(data).length,
            });
            return builder;
        },
        metadata: (metadata) => {
            message.metadata = MessageMetadataSchema.parse({
                source: 'agent-os-protocol',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                tags: [],
                custom: {},
                ...metadata,
            });
            return builder;
        },
        headers: (headers) => {
            message.headers = { ...message.headers, ...headers };
            return builder;
        },
        priority: (priority) => {
            message.priority = priority;
            return builder;
        },
        qos: (level) => {
            message.qos = level;
            return builder;
        },
        ttl: (milliseconds) => {
            message.ttl = milliseconds;
            return builder;
        },
        signature: (signature) => {
            message.signature = signature;
            return builder;
        },
        capabilities: (capabilities) => {
            message.capabilities = capabilities;
            return builder;
        },
        token: (token) => {
            message.token = token;
            return builder;
        },
        retryPolicy: (policy) => {
            message.retryPolicy = policy;
            return builder;
        },
        deadline: (deadline) => {
            message.deadline = deadline;
            return builder;
        },
        traceId: (traceId) => {
            message.traceId = traceId;
            return builder;
        },
        spanId: (spanId) => {
            message.spanId = spanId;
            return builder;
        },
        build: () => {
            const finalMessage = message;
            if (!validateMessage(finalMessage)) {
                throw new ValidationError('Invalid message configuration');
            }
            return finalMessage;
        },
    };
};
const builder = createMessageBuilder('REQUEST');
// ============================================================================
// LEGACY EXPORTS FOR BACKWARD COMPATIBILITY
// ============================================================================
export const MessageFactory = {
    createMessage,
    createRequest,
    createResponse,
    createEvent,
    createError,
};
export const DefaultMessageProcessor = createDefaultMessageProcessor();
export const MessageValidator = {
    validate: validateMessageStructure,
};
export const MessageSerializer = {
    serialize: serializeMessage,
    deserialize: deserializeMessage,
    serializeToString: serializeMessageToString,
    deserializeFromString: deserializeMessageFromString,
};
export const MessageBuilder = {
    create: createMessageBuilder,
};
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
const randomUUID = () => {
    return crypto.randomUUID();
};
//# sourceMappingURL=message.js.map