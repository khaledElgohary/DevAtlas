import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type MembershipDocument = HydratedDocument<Membership>;
export type OrganizationRole = 'owner' | 'admin' | 'member';
export declare class Membership {
    userId: Types.ObjectId;
    organizationId: Types.ObjectId;
    role: OrganizationRole;
}
export declare const MembershipSchema: MongooseSchema<Membership, import("mongoose").Model<Membership, any, any, any, any, any, Membership>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Membership, import("mongoose").Document<unknown, {}, Membership, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<OrganizationRole, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Membership>;
