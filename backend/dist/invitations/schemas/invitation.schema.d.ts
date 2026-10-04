import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type InvitationDocument = HydratedDocument<Invitation>;
export declare class Invitation {
    organizationId: Types.ObjectId;
    email: string;
    role: 'admin' | 'member';
    tokenHash: string;
    invitedBy: Types.ObjectId;
    expiresAt: Date;
    acceptedAt: Date | null;
}
export declare const InvitationSchema: MongooseSchema<Invitation, import("mongoose").Model<Invitation, any, any, any, any, any, Invitation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<"admin" | "member", Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tokenHash?: import("mongoose").SchemaDefinitionProperty<string, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    invitedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    acceptedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, Invitation, import("mongoose").Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Invitation>;
