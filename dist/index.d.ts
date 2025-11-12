/**
 * Agent OS Core Message Protocol - Main Export
 *
 * Provides unified access to all protocol components
 */
export * from './types/index.js';
export { createMessage, createRequest, createResponse, createEvent, createError, createDefaultMessageProcessor, validateMessageStructure, serializeMessage, deserializeMessage, serializeMessageToString, deserializeMessageFromString, createMessageBuilder, MessageFactory, DefaultMessageProcessor, MessageValidator, MessageSerializer, MessageBuilder, type MessageProcessor, } from './core/message.js';
export { HttpTransport, createHttpTransport, isHttpTransport, type HttpTransportConfig, type HttpConnection, } from './transports/http-transport.js';
export declare const validateMessageSafe: (message: unknown) => boolean;
export declare const createRequestMessage: (params: {
    sender: import("./types/index.js").AgentAddress;
    recipient: import("./types/index.js").AgentAddress;
    data: unknown;
    priority?: import("./types/index.js").Priority;
}) => import("./types/index.js").CoreMessage;
export declare const createResponseMessage: (params: {
    sender: import("./types/index.js").AgentAddress;
    recipient: import("./types/index.js").AgentAddress;
    data: unknown;
    correlationId: string;
    priority?: import("./types/index.js").Priority;
}) => import("./types/index.js").CoreMessage;
export declare const createEventMessage: (params: {
    sender: import("./types/index.js").AgentAddress;
    recipient?: import("./types/index.js").AgentAddress;
    data: unknown;
    priority?: import("./types/index.js").Priority;
}) => import("./types/index.js").CoreMessage;
export declare const createErrorMessage: (params: {
    sender: import("./types/index.js").AgentAddress;
    recipient: import("./types/index.js").AgentAddress;
    error: Error | string;
    correlationId?: string;
    priority?: import("./types/index.js").Priority;
}) => import("./types/index.js").CoreMessage;
//# sourceMappingURL=index.d.ts.map