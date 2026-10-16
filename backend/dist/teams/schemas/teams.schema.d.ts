import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type TeamDocument = HydratedDocument<Team>;
export declare class Team {
    name: string;
    organizationId: Types.ObjectId;
}
export declare const TeamSchema: MongooseSchema<Team, import("mongoose").Model<Team, any, any, any, any, any, Team>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, import("mongoose").Document<unknown, {}, Team, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    organizationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Team, import("mongoose").Document<unknown, {}, Team, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Team & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Team>;
