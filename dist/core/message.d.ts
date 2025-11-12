/**
 * Core Message Implementation
 *
 * Implements the CoreMessage type with validation, serialization,
 * and protocol operations using functional programming patterns.
 */
import { CoreMessage, MessageType, Priority, QoSLevel, AgentAddress } from '../types/index.js';
export declare const createMessage: (params: {
    type: MessageType;
    sender: AgentAddress;
    recipient: AgentAddress;
    payload: unknown;
    priority?: Priority;
    qos?: QoSLevel;
}) => CoreMessage;
export declare const createRequest: (params: {
    sender: AgentAddress;
    recipient: AgentAddress;
    data: unknown;
    priority?: Priority;
}) => CoreMessage;
export declare const createResponse: (params: {
    sender: AgentAddress;
    recipient: AgentAddress;
    data: unknown;
    correlationId: string;
    priority?: Priority;
}) => CoreMessage;
export declare const createEvent: (params: {
    sender: AgentAddress;
    recipient?: AgentAddress;
    data: unknown;
    priority?: Priority;
}) => CoreMessage;
export declare const createError: (params: {
    sender: AgentAddress;
    recipient: AgentAddress;
    error: Error | string;
    correlationId?: string;
    priority?: Priority;
}) => CoreMessage;
export type MessageProcessor = {
    process(message: CoreMessage): Promise<CoreMessage | null>;
};
export declare const createDefaultMessageProcessor: () => MessageProcessor;
export declare const validateMessageStructure: (message: CoreMessage) => {
    valid: boolean;
    errors: string[];
};
export declare const serializeMessage: (message: CoreMessage) => Uint8Array;
export declare const deserializeMessage: (data: Uint8Array) => CoreMessage;
export declare const serializeMessageToString: (message: CoreMessage) => string;
export declare const deserializeMessageFromString: (jsonString: string) => CoreMessage;
export declare const createMessageBuilder: (type: MessageType) => {
    sender: (address: AgentAddress) => /*elided*/ any;
    recipient: (address: AgentAddress) => /*elided*/ any;
    replyTo: (address: AgentAddress) => /*elided*/ any;
    correlationId: (id: string) => /*elided*/ any;
    payload: (data: unknown, type?: string) => /*elided*/ any;
    metadata: (metadata: Partial<CoreMessage["metadata"]>) => /*elided*/ any;
    headers: (headers: Record<string, string>) => /*elided*/ any;
    priority: (priority: Priority) => /*elided*/ any;
    qos: (level: QoSLevel) => /*elided*/ any;
    ttl: (milliseconds: number) => /*elided*/ any;
    signature: (signature: CoreMessage["signature"]) => /*elided*/ any;
    capabilities: (capabilities: string[]) => /*elided*/ any;
    token: (token: string) => /*elided*/ any;
    retryPolicy: (policy: CoreMessage["retryPolicy"]) => /*elided*/ any;
    deadline: (deadline: string) => /*elided*/ any;
    traceId: (traceId: string) => /*elided*/ any;
    spanId: (spanId: string) => /*elided*/ any;
    build: () => CoreMessage;
};
export declare const MessageFactory: {
    createMessage: (params: {
        type: MessageType;
        sender: AgentAddress;
        recipient: AgentAddress;
        payload: unknown;
        priority?: Priority;
        qos?: QoSLevel;
    }) => CoreMessage;
    createRequest: (params: {
        sender: AgentAddress;
        recipient: AgentAddress;
        data: unknown;
        priority?: Priority;
    }) => CoreMessage;
    createResponse: (params: {
        sender: AgentAddress;
        recipient: AgentAddress;
        data: unknown;
        correlationId: string;
        priority?: Priority;
    }) => CoreMessage;
    createEvent: (params: {
        sender: AgentAddress;
        recipient?: AgentAddress;
        data: unknown;
        priority?: Priority;
    }) => CoreMessage;
    createError: (params: {
        sender: AgentAddress;
        recipient: AgentAddress;
        error: Error | string;
        correlationId?: string;
        priority?: Priority;
    }) => CoreMessage;
};
export declare const DefaultMessageProcessor: MessageProcessor;
export declare const MessageValidator: {
    validate: (message: CoreMessage) => {
        valid: boolean;
        errors: string[];
    };
};
export declare const MessageSerializer: {
    serialize: (message: CoreMessage) => Uint8Array;
    deserialize: (data: Uint8Array) => CoreMessage;
    serializeToString: (message: CoreMessage) => string;
    deserializeFromString: (jsonString: string) => CoreMessage;
};
export declare const MessageBuilder: {
    create: (type: MessageType) => {
        sender: (address: AgentAddress) => /*elided*/ any;
        recipient: (address: AgentAddress) => /*elided*/ any;
        replyTo: (address: AgentAddress) => /*elided*/ any;
        correlationId: (id: string) => /*elided*/ any;
        payload: (data: unknown, type?: string) => /*elided*/ any;
        metadata: (metadata: Partial<CoreMessage["metadata"]>) => /*elided*/ any;
        headers: (headers: Record<string, string>) => /*elided*/ any;
        priority: (priority: Priority) => /*elided*/ any;
        qos: (level: QoSLevel) => /*elided*/ any;
        ttl: (milliseconds: number) => /*elided*/ any;
        signature: (signature: CoreMessage["signature"]) => /*elided*/ any;
        capabilities: (capabilities: string[]) => /*elided*/ any;
        token: (token: string) => /*elided*/ any;
        retryPolicy: (policy: CoreMessage["retryPolicy"]) => /*elided*/ any;
        deadline: (deadline: string) => /*elided*/ any;
        traceId: (traceId: string) => /*elided*/ any;
        spanId: (spanId: string) => /*elided*/ any;
        build: () => CoreMessage;
    };
};
//# sourceMappingURL=message.d.ts.map