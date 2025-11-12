/**
 * Agent OS Core Message Protocol Types
 *
 * Unified messaging protocol for agent communication with enterprise-grade
 * security, observability, and scalability.
 */
import { z } from 'zod';
export declare const MessageTypeEnum: z.ZodEnum<["REQUEST", "RESPONSE", "EVENT", "STREAM", "HANDSHAKE", "HEARTBEAT", "DISCOVERY", "CAPABILITY_NEGOTIATION", "ERROR", "TIMEOUT", "CIRCUIT_BREAK", "AGENT_REGISTER", "AGENT_UNREGISTER", "AGENT_STATUS", "SERVICE_HEALTH"]>;
export type MessageType = z.infer<typeof MessageTypeEnum>;
export declare const PriorityEnum: z.ZodEnum<["LOW", "NORMAL", "HIGH", "CRITICAL"]>;
export type Priority = z.infer<typeof PriorityEnum>;
export declare const QoSLevelEnum: z.ZodEnum<["AT_MOST_ONCE", "AT_LEAST_ONCE", "EXACTLY_ONCE"]>;
export type QoSLevel = z.infer<typeof QoSLevelEnum>;
export declare const AgentAddressSchema: z.ZodObject<{
    id: z.ZodString;
    namespace: z.ZodString;
    domain: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    namespace: string;
    domain: string;
    version?: string | undefined;
    endpoint?: string | undefined;
}, {
    id: string;
    namespace: string;
    domain: string;
    version?: string | undefined;
    endpoint?: string | undefined;
}>;
export type AgentAddress = z.infer<typeof AgentAddressSchema>;
export declare const MessageSignatureSchema: z.ZodObject<{
    algorithm: z.ZodEnum<["ES256", "RS256", "HS256"]>;
    keyId: z.ZodString;
    signature: z.ZodString;
    certificate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    algorithm: "ES256" | "RS256" | "HS256";
    keyId: string;
    signature: string;
    certificate?: string | undefined;
}, {
    algorithm: "ES256" | "RS256" | "HS256";
    keyId: string;
    signature: string;
    certificate?: string | undefined;
}>;
export type MessageSignature = z.infer<typeof MessageSignatureSchema>;
export declare const EncryptionSchema: z.ZodObject<{
    algorithm: z.ZodEnum<["AES-256-GCM", "ChaCha20-Poly1305"]>;
    keyId: z.ZodString;
    iv: z.ZodString;
    ciphertext: z.ZodString;
    tag: z.ZodString;
}, "strip", z.ZodTypeAny, {
    algorithm: "AES-256-GCM" | "ChaCha20-Poly1305";
    keyId: string;
    iv: string;
    ciphertext: string;
    tag: string;
}, {
    algorithm: "AES-256-GCM" | "ChaCha20-Poly1305";
    keyId: string;
    iv: string;
    ciphertext: string;
    tag: string;
}>;
export type Encryption = z.infer<typeof EncryptionSchema>;
export declare const CapabilitySchema: z.ZodObject<{
    id: z.ZodString;
    namespace: z.ZodString;
    actions: z.ZodArray<z.ZodString, "many">;
    resources: z.ZodArray<z.ZodString, "many">;
    conditions: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    namespace: string;
    actions: string[];
    resources: string[];
    conditions: Record<string, unknown>[];
}, {
    id: string;
    namespace: string;
    actions: string[];
    resources: string[];
    conditions: Record<string, unknown>[];
}>;
export type Capability = z.infer<typeof CapabilitySchema>;
export declare const SecurityContextSchema: z.ZodObject<{
    principal: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        attributes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        attributes: Record<string, unknown>;
    }, {
        type: string;
        id: string;
        attributes: Record<string, unknown>;
    }>;
    credentials: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    tokenExpiry: z.ZodString;
    capabilities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        actions: z.ZodArray<z.ZodString, "many">;
        resources: z.ZodArray<z.ZodString, "many">;
        conditions: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }, {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }>, "many">;
    permissions: z.ZodArray<z.ZodString, "many">;
    roles: z.ZodArray<z.ZodString, "many">;
    trustLevel: z.ZodEnum<["untrusted", "partial", "trusted", "verified"]>;
    sandbox: z.ZodObject<{
        enabled: z.ZodBoolean;
        limits: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        limits: Record<string, unknown>;
    }, {
        enabled: boolean;
        limits: Record<string, unknown>;
    }>;
    resourceLimits: z.ZodObject<{
        cpu: z.ZodNumber;
        memory: z.ZodNumber;
        disk: z.ZodNumber;
        network: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    }, {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    }>;
}, "strip", z.ZodTypeAny, {
    principal: {
        type: string;
        id: string;
        attributes: Record<string, unknown>;
    };
    credentials: Record<string, unknown>;
    tokenExpiry: string;
    capabilities: {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }[];
    permissions: string[];
    roles: string[];
    trustLevel: "untrusted" | "partial" | "trusted" | "verified";
    sandbox: {
        enabled: boolean;
        limits: Record<string, unknown>;
    };
    resourceLimits: {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    };
}, {
    principal: {
        type: string;
        id: string;
        attributes: Record<string, unknown>;
    };
    credentials: Record<string, unknown>;
    tokenExpiry: string;
    capabilities: {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }[];
    permissions: string[];
    roles: string[];
    trustLevel: "untrusted" | "partial" | "trusted" | "verified";
    sandbox: {
        enabled: boolean;
        limits: Record<string, unknown>;
    };
    resourceLimits: {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    };
}>;
export type SecurityContext = z.infer<typeof SecurityContextSchema>;
export declare const MessagePayloadSchema: z.ZodObject<{
    type: z.ZodString;
    data: z.ZodUnknown;
    encoding: z.ZodDefault<z.ZodEnum<["json", "binary", "text"]>>;
    compression: z.ZodDefault<z.ZodEnum<["none", "gzip", "brotli"]>>;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    encoding: "json" | "binary" | "text";
    compression: "none" | "gzip" | "brotli";
    size: number;
    data?: unknown;
}, {
    type: string;
    size: number;
    data?: unknown;
    encoding?: "json" | "binary" | "text" | undefined;
    compression?: "none" | "gzip" | "brotli" | undefined;
}>;
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;
export declare const MessageMetadataSchema: z.ZodObject<{
    source: z.ZodString;
    version: z.ZodString;
    timestamp: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
    custom: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    version: string;
    custom: Record<string, unknown>;
    source: string;
    timestamp: string;
    tags: string[];
}, {
    version: string;
    custom: Record<string, unknown>;
    source: string;
    timestamp: string;
    tags: string[];
}>;
export type MessageMetadata = z.infer<typeof MessageMetadataSchema>;
export declare const CoreMessageSchema: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodDefault<z.ZodString>;
    type: z.ZodEnum<["REQUEST", "RESPONSE", "EVENT", "STREAM", "HANDSHAKE", "HEARTBEAT", "DISCOVERY", "CAPABILITY_NEGOTIATION", "ERROR", "TIMEOUT", "CIRCUIT_BREAK", "AGENT_REGISTER", "AGENT_UNREGISTER", "AGENT_STATUS", "SERVICE_HEALTH"]>;
    timestamp: z.ZodString;
    sender: z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        domain: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }>;
    recipient: z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        domain: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }>;
    replyTo: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        domain: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }>>;
    correlationId: z.ZodOptional<z.ZodString>;
    signature: z.ZodOptional<z.ZodObject<{
        algorithm: z.ZodEnum<["ES256", "RS256", "HS256"]>;
        keyId: z.ZodString;
        signature: z.ZodString;
        certificate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        algorithm: "ES256" | "RS256" | "HS256";
        keyId: string;
        signature: string;
        certificate?: string | undefined;
    }, {
        algorithm: "ES256" | "RS256" | "HS256";
        keyId: string;
        signature: string;
        certificate?: string | undefined;
    }>>;
    capabilities: z.ZodArray<z.ZodString, "many">;
    token: z.ZodOptional<z.ZodString>;
    payload: z.ZodObject<{
        type: z.ZodString;
        data: z.ZodUnknown;
        encoding: z.ZodDefault<z.ZodEnum<["json", "binary", "text"]>>;
        compression: z.ZodDefault<z.ZodEnum<["none", "gzip", "brotli"]>>;
        size: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: string;
        encoding: "json" | "binary" | "text";
        compression: "none" | "gzip" | "brotli";
        size: number;
        data?: unknown;
    }, {
        type: string;
        size: number;
        data?: unknown;
        encoding?: "json" | "binary" | "text" | undefined;
        compression?: "none" | "gzip" | "brotli" | undefined;
    }>;
    metadata: z.ZodObject<{
        source: z.ZodString;
        version: z.ZodString;
        timestamp: z.ZodString;
        tags: z.ZodArray<z.ZodString, "many">;
        custom: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        custom: Record<string, unknown>;
        source: string;
        timestamp: string;
        tags: string[];
    }, {
        version: string;
        custom: Record<string, unknown>;
        source: string;
        timestamp: string;
        tags: string[];
    }>;
    headers: z.ZodRecord<z.ZodString, z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<["LOW", "NORMAL", "HIGH", "CRITICAL"]>>;
    ttl: z.ZodOptional<z.ZodNumber>;
    qos: z.ZodDefault<z.ZodEnum<["AT_MOST_ONCE", "AT_LEAST_ONCE", "EXACTLY_ONCE"]>>;
    retryPolicy: z.ZodOptional<z.ZodObject<{
        maxAttempts: z.ZodNumber;
        backoffStrategy: z.ZodEnum<["fixed", "linear", "exponential", "exponential_with_jitter"]>;
        retryConditions: z.ZodArray<z.ZodString, "many">;
        deadLetterQueue: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        maxAttempts: number;
        backoffStrategy: "fixed" | "linear" | "exponential" | "exponential_with_jitter";
        retryConditions: string[];
        deadLetterQueue?: string | undefined;
    }, {
        maxAttempts: number;
        backoffStrategy: "fixed" | "linear" | "exponential" | "exponential_with_jitter";
        retryConditions: string[];
        deadLetterQueue?: string | undefined;
    }>>;
    deadline: z.ZodOptional<z.ZodString>;
    traceId: z.ZodOptional<z.ZodString>;
    spanId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "REQUEST" | "RESPONSE" | "EVENT" | "STREAM" | "HANDSHAKE" | "HEARTBEAT" | "DISCOVERY" | "CAPABILITY_NEGOTIATION" | "ERROR" | "TIMEOUT" | "CIRCUIT_BREAK" | "AGENT_REGISTER" | "AGENT_UNREGISTER" | "AGENT_STATUS" | "SERVICE_HEALTH";
    id: string;
    version: string;
    capabilities: string[];
    timestamp: string;
    sender: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    recipient: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    payload: {
        type: string;
        encoding: "json" | "binary" | "text";
        compression: "none" | "gzip" | "brotli";
        size: number;
        data?: unknown;
    };
    metadata: {
        version: string;
        custom: Record<string, unknown>;
        source: string;
        timestamp: string;
        tags: string[];
    };
    headers: Record<string, string>;
    priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
    qos: "AT_MOST_ONCE" | "AT_LEAST_ONCE" | "EXACTLY_ONCE";
    signature?: {
        algorithm: "ES256" | "RS256" | "HS256";
        keyId: string;
        signature: string;
        certificate?: string | undefined;
    } | undefined;
    replyTo?: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    } | undefined;
    correlationId?: string | undefined;
    token?: string | undefined;
    ttl?: number | undefined;
    retryPolicy?: {
        maxAttempts: number;
        backoffStrategy: "fixed" | "linear" | "exponential" | "exponential_with_jitter";
        retryConditions: string[];
        deadLetterQueue?: string | undefined;
    } | undefined;
    deadline?: string | undefined;
    traceId?: string | undefined;
    spanId?: string | undefined;
}, {
    type: "REQUEST" | "RESPONSE" | "EVENT" | "STREAM" | "HANDSHAKE" | "HEARTBEAT" | "DISCOVERY" | "CAPABILITY_NEGOTIATION" | "ERROR" | "TIMEOUT" | "CIRCUIT_BREAK" | "AGENT_REGISTER" | "AGENT_UNREGISTER" | "AGENT_STATUS" | "SERVICE_HEALTH";
    id: string;
    capabilities: string[];
    timestamp: string;
    sender: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    recipient: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    payload: {
        type: string;
        size: number;
        data?: unknown;
        encoding?: "json" | "binary" | "text" | undefined;
        compression?: "none" | "gzip" | "brotli" | undefined;
    };
    metadata: {
        version: string;
        custom: Record<string, unknown>;
        source: string;
        timestamp: string;
        tags: string[];
    };
    headers: Record<string, string>;
    version?: string | undefined;
    signature?: {
        algorithm: "ES256" | "RS256" | "HS256";
        keyId: string;
        signature: string;
        certificate?: string | undefined;
    } | undefined;
    replyTo?: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    } | undefined;
    correlationId?: string | undefined;
    token?: string | undefined;
    priority?: "LOW" | "NORMAL" | "HIGH" | "CRITICAL" | undefined;
    ttl?: number | undefined;
    qos?: "AT_MOST_ONCE" | "AT_LEAST_ONCE" | "EXACTLY_ONCE" | undefined;
    retryPolicy?: {
        maxAttempts: number;
        backoffStrategy: "fixed" | "linear" | "exponential" | "exponential_with_jitter";
        retryConditions: string[];
        deadLetterQueue?: string | undefined;
    } | undefined;
    deadline?: string | undefined;
    traceId?: string | undefined;
    spanId?: string | undefined;
}>;
export type CoreMessage = z.infer<typeof CoreMessageSchema>;
export declare const HandshakeRequestSchema: z.ZodObject<{
    protocolVersion: z.ZodString;
    agentId: z.ZodString;
    capabilities: z.ZodArray<z.ZodString, "many">;
    securityContext: z.ZodObject<{
        principal: z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            attributes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        }, {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        }>;
        credentials: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        tokenExpiry: z.ZodString;
        capabilities: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            namespace: z.ZodString;
            actions: z.ZodArray<z.ZodString, "many">;
            resources: z.ZodArray<z.ZodString, "many">;
            conditions: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }, {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }>, "many">;
        permissions: z.ZodArray<z.ZodString, "many">;
        roles: z.ZodArray<z.ZodString, "many">;
        trustLevel: z.ZodEnum<["untrusted", "partial", "trusted", "verified"]>;
        sandbox: z.ZodObject<{
            enabled: z.ZodBoolean;
            limits: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            limits: Record<string, unknown>;
        }, {
            enabled: boolean;
            limits: Record<string, unknown>;
        }>;
        resourceLimits: z.ZodObject<{
            cpu: z.ZodNumber;
            memory: z.ZodNumber;
            disk: z.ZodNumber;
            network: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        }, {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    }, {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    capabilities: string[];
    protocolVersion: string;
    agentId: string;
    securityContext: {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    };
}, {
    capabilities: string[];
    protocolVersion: string;
    agentId: string;
    securityContext: {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    };
}>;
export type HandshakeRequest = z.infer<typeof HandshakeRequestSchema>;
export declare const HandshakeResponseSchema: z.ZodObject<{
    accepted: z.ZodBoolean;
    protocolVersion: z.ZodString;
    assignedCapabilities: z.ZodArray<z.ZodString, "many">;
    securityContext: z.ZodObject<{
        principal: z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            attributes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        }, {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        }>;
        credentials: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        tokenExpiry: z.ZodString;
        capabilities: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            namespace: z.ZodString;
            actions: z.ZodArray<z.ZodString, "many">;
            resources: z.ZodArray<z.ZodString, "many">;
            conditions: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }, {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }>, "many">;
        permissions: z.ZodArray<z.ZodString, "many">;
        roles: z.ZodArray<z.ZodString, "many">;
        trustLevel: z.ZodEnum<["untrusted", "partial", "trusted", "verified"]>;
        sandbox: z.ZodObject<{
            enabled: z.ZodBoolean;
            limits: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            limits: Record<string, unknown>;
        }, {
            enabled: boolean;
            limits: Record<string, unknown>;
        }>;
        resourceLimits: z.ZodObject<{
            cpu: z.ZodNumber;
            memory: z.ZodNumber;
            disk: z.ZodNumber;
            network: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        }, {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    }, {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    }>;
    connectionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    protocolVersion: string;
    securityContext: {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    };
    accepted: boolean;
    assignedCapabilities: string[];
    connectionId: string;
}, {
    protocolVersion: string;
    securityContext: {
        principal: {
            type: string;
            id: string;
            attributes: Record<string, unknown>;
        };
        credentials: Record<string, unknown>;
        tokenExpiry: string;
        capabilities: {
            id: string;
            namespace: string;
            actions: string[];
            resources: string[];
            conditions: Record<string, unknown>[];
        }[];
        permissions: string[];
        roles: string[];
        trustLevel: "untrusted" | "partial" | "trusted" | "verified";
        sandbox: {
            enabled: boolean;
            limits: Record<string, unknown>;
        };
        resourceLimits: {
            cpu: number;
            memory: number;
            disk: number;
            network: number;
        };
    };
    accepted: boolean;
    assignedCapabilities: string[];
    connectionId: string;
}>;
export type HandshakeResponse = z.infer<typeof HandshakeResponseSchema>;
export declare const HeartbeatSchema: z.ZodObject<{
    timestamp: z.ZodString;
    sequence: z.ZodNumber;
    status: z.ZodEnum<["healthy", "degraded", "unhealthy"]>;
    metrics: z.ZodObject<{
        cpu: z.ZodNumber;
        memory: z.ZodNumber;
        activeConnections: z.ZodNumber;
        messagesProcessed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        cpu: number;
        memory: number;
        activeConnections: number;
        messagesProcessed: number;
    }, {
        cpu: number;
        memory: number;
        activeConnections: number;
        messagesProcessed: number;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "healthy" | "degraded" | "unhealthy";
    timestamp: string;
    sequence: number;
    metrics: {
        cpu: number;
        memory: number;
        activeConnections: number;
        messagesProcessed: number;
    };
}, {
    status: "healthy" | "degraded" | "unhealthy";
    timestamp: string;
    sequence: number;
    metrics: {
        cpu: number;
        memory: number;
        activeConnections: number;
        messagesProcessed: number;
    };
}>;
export type Heartbeat = z.infer<typeof HeartbeatSchema>;
export declare const HealthStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["healthy", "unhealthy", "degraded"]>;
    lastCheck: z.ZodString;
    responseTime: z.ZodNumber;
    errorRate: z.ZodNumber;
    uptime: z.ZodNumber;
    details: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    status: "healthy" | "degraded" | "unhealthy";
    lastCheck: string;
    responseTime: number;
    errorRate: number;
    uptime: number;
    details: Record<string, unknown>;
}, {
    status: "healthy" | "degraded" | "unhealthy";
    lastCheck: string;
    responseTime: number;
    errorRate: number;
    uptime: number;
    details: Record<string, unknown>;
}>;
export type HealthStatus = z.infer<typeof HealthStatusSchema>;
export declare const ServiceQuerySchema: z.ZodObject<{
    namespace: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
    capabilities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    healthStatus: z.ZodDefault<z.ZodEnum<["healthy", "unhealthy", "degraded", "any"]>>;
}, "strip", z.ZodTypeAny, {
    healthStatus: "healthy" | "degraded" | "unhealthy" | "any";
    namespace?: string | undefined;
    domain?: string | undefined;
    capabilities?: string[] | undefined;
}, {
    namespace?: string | undefined;
    domain?: string | undefined;
    capabilities?: string[] | undefined;
    healthStatus?: "healthy" | "degraded" | "unhealthy" | "any" | undefined;
}>;
export type ServiceQuery = z.infer<typeof ServiceQuerySchema>;
export declare const AgentInstanceSchema: z.ZodObject<{
    agent: z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        domain: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }, {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    }>;
    endpoints: z.ZodArray<z.ZodString, "many">;
    capabilities: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        namespace: z.ZodString;
        actions: z.ZodArray<z.ZodString, "many">;
        resources: z.ZodArray<z.ZodString, "many">;
        conditions: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }, {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }>, "many">;
    health: z.ZodObject<{
        status: z.ZodEnum<["healthy", "unhealthy", "degraded"]>;
        lastCheck: z.ZodString;
        responseTime: z.ZodNumber;
        errorRate: z.ZodNumber;
        uptime: z.ZodNumber;
        details: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        status: "healthy" | "degraded" | "unhealthy";
        lastCheck: string;
        responseTime: number;
        errorRate: number;
        uptime: number;
        details: Record<string, unknown>;
    }, {
        status: "healthy" | "degraded" | "unhealthy";
        lastCheck: string;
        responseTime: number;
        errorRate: number;
        uptime: number;
        details: Record<string, unknown>;
    }>;
    load: z.ZodObject<{
        cpu: z.ZodNumber;
        memory: z.ZodNumber;
        connections: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        cpu: number;
        memory: number;
        connections: number;
    }, {
        cpu: number;
        memory: number;
        connections: number;
    }>;
    lastSeen: z.ZodString;
}, "strip", z.ZodTypeAny, {
    capabilities: {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }[];
    agent: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    endpoints: string[];
    health: {
        status: "healthy" | "degraded" | "unhealthy";
        lastCheck: string;
        responseTime: number;
        errorRate: number;
        uptime: number;
        details: Record<string, unknown>;
    };
    load: {
        cpu: number;
        memory: number;
        connections: number;
    };
    lastSeen: string;
}, {
    capabilities: {
        id: string;
        namespace: string;
        actions: string[];
        resources: string[];
        conditions: Record<string, unknown>[];
    }[];
    agent: {
        id: string;
        namespace: string;
        domain: string;
        version?: string | undefined;
        endpoint?: string | undefined;
    };
    endpoints: string[];
    health: {
        status: "healthy" | "degraded" | "unhealthy";
        lastCheck: string;
        responseTime: number;
        errorRate: number;
        uptime: number;
        details: Record<string, unknown>;
    };
    load: {
        cpu: number;
        memory: number;
        connections: number;
    };
    lastSeen: string;
}>;
export type AgentInstance = z.infer<typeof AgentInstanceSchema>;
export declare const LoadBalancingStrategyEnum: z.ZodEnum<["ROUND_ROBIN", "LEAST_CONNECTIONS", "WEIGHTED_ROUND_ROBIN", "RANDOM", "CONSISTENT_HASH"]>;
export type LoadBalancingStrategy = z.infer<typeof LoadBalancingStrategyEnum>;
export declare const TraceContextSchema: z.ZodObject<{
    traceId: z.ZodString;
    spanId: z.ZodString;
    parentSpanId: z.ZodOptional<z.ZodString>;
    baggage: z.ZodRecord<z.ZodString, z.ZodString>;
    sampled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    traceId: string;
    spanId: string;
    baggage: Record<string, string>;
    sampled: boolean;
    parentSpanId?: string | undefined;
}, {
    traceId: string;
    spanId: string;
    baggage: Record<string, string>;
    sampled: boolean;
    parentSpanId?: string | undefined;
}>;
export type TraceContext = z.infer<typeof TraceContextSchema>;
export declare const SpanSchema: z.ZodObject<{
    traceId: z.ZodString;
    spanId: z.ZodString;
    operationName: z.ZodString;
    startTime: z.ZodNumber;
    endTime: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    logs: z.ZodArray<z.ZodObject<{
        timestamp: z.ZodNumber;
        level: z.ZodString;
        message: z.ZodString;
        fields: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        timestamp: number;
        level: string;
        fields: Record<string, unknown>;
    }, {
        message: string;
        timestamp: number;
        level: string;
        fields: Record<string, unknown>;
    }>, "many">;
    status: z.ZodEnum<["ok", "error", "timeout", "cancelled"]>;
}, "strip", z.ZodTypeAny, {
    status: "ok" | "error" | "timeout" | "cancelled";
    tags: Record<string, unknown>;
    traceId: string;
    spanId: string;
    operationName: string;
    startTime: number;
    logs: {
        message: string;
        timestamp: number;
        level: string;
        fields: Record<string, unknown>;
    }[];
    endTime?: number | undefined;
}, {
    status: "ok" | "error" | "timeout" | "cancelled";
    tags: Record<string, unknown>;
    traceId: string;
    spanId: string;
    operationName: string;
    startTime: number;
    logs: {
        message: string;
        timestamp: number;
        level: string;
        fields: Record<string, unknown>;
    }[];
    endTime?: number | undefined;
}>;
export type Span = z.infer<typeof SpanSchema>;
export declare const TransportConfigSchema: z.ZodObject<{
    type: z.ZodEnum<["http", "websocket", "tcp", "udp", "memory"]>;
    endpoint: z.ZodString;
    timeout: z.ZodDefault<z.ZodNumber>;
    retryAttempts: z.ZodDefault<z.ZodNumber>;
    security: z.ZodObject<{
        tls: z.ZodDefault<z.ZodBoolean>;
        certificates: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        ca: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tls: boolean;
        certificates?: string[] | undefined;
        ca?: string | undefined;
    }, {
        tls?: boolean | undefined;
        certificates?: string[] | undefined;
        ca?: string | undefined;
    }>;
    compression: z.ZodDefault<z.ZodBoolean>;
    serialization: z.ZodDefault<z.ZodEnum<["json", "protobuf", "msgpack", "cbor"]>>;
}, "strip", z.ZodTypeAny, {
    type: "memory" | "http" | "websocket" | "tcp" | "udp";
    endpoint: string;
    compression: boolean;
    timeout: number;
    retryAttempts: number;
    security: {
        tls: boolean;
        certificates?: string[] | undefined;
        ca?: string | undefined;
    };
    serialization: "json" | "protobuf" | "msgpack" | "cbor";
}, {
    type: "memory" | "http" | "websocket" | "tcp" | "udp";
    endpoint: string;
    security: {
        tls?: boolean | undefined;
        certificates?: string[] | undefined;
        ca?: string | undefined;
    };
    compression?: boolean | undefined;
    timeout?: number | undefined;
    retryAttempts?: number | undefined;
    serialization?: "json" | "protobuf" | "msgpack" | "cbor" | undefined;
}>;
export type TransportConfig = z.infer<typeof TransportConfigSchema>;
export interface Transport {
    connect(endpoint: string): Promise<Connection>;
    disconnect(connectionId: string): Promise<void>;
    send(message: CoreMessage): Promise<void>;
    receive(): AsyncIterable<CoreMessage>;
    acknowledge(messageId: string): Promise<void>;
    reject(messageId: string, reason: string): Promise<void>;
    setFlowControl(config: FlowControlConfig): void;
    getFlowControlStatus(): FlowControlStatus;
}
export interface Connection {
    id: string;
    endpoint: string;
    status: 'connected' | 'disconnected' | 'connecting' | 'error';
    lastActivity: Date;
    metrics: ConnectionMetrics;
}
export interface ConnectionMetrics {
    messagesSent: number;
    messagesReceived: number;
    bytesTransferred: number;
    errorCount: number;
    averageLatency: number;
    totalConnections?: number;
    activeConnections?: number;
    failedConnections?: number;
    totalRequests?: number;
    successfulRequests?: number;
    failedRequests?: number;
    lastActivity?: Date | string;
    errors?: number;
}
export interface FlowControlConfig {
    rateLimit: number;
    bufferSize: number;
    backpressureThreshold: number;
}
export interface FlowControlStatus {
    currentRate: number;
    bufferUtilization: number;
    backpressureActive: boolean;
}
export declare const createCoreMessage: (data: unknown) => CoreMessage;
export declare const validateMessage: (message: CoreMessage) => boolean;
export declare const createAgentAddress: (data: unknown) => AgentAddress;
export declare const createSecurityContext: (data: unknown) => SecurityContext;
export declare class ProtocolError extends Error {
    readonly code: string;
    readonly details?: Record<string, unknown> | undefined;
    constructor(message: string, code: string, details?: Record<string, unknown> | undefined);
}
export declare class ValidationError extends ProtocolError {
    constructor(message: string, details?: Record<string, unknown>);
}
export declare class SecurityError extends ProtocolError {
    constructor(message: string, details?: Record<string, unknown>);
}
export declare class TransportError extends ProtocolError {
    constructor(message: string, details?: Record<string, unknown>);
}
//# sourceMappingURL=index.d.ts.map