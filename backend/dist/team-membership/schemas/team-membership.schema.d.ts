import { Schema as MongooseSchema, Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type TeamMembershipDocument = HydratedDocument<TeamMembership>;
export declare class TeamMembership {
    teamId: Types.ObjectId;
    userId: Types.ObjectId;
}
export declare const TeamMembershipSchema: MongooseSchema<TeamMembership, import("mongoose").Model<TeamMembership, any, any, any, any, any, TeamMembership>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamMembership, import("mongoose").Document<unknown, {}, TeamMembership, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeamMembership & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    teamId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TeamMembership, import("mongoose").Document<unknown, {}, TeamMembership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMembership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TeamMembership, import("mongoose").Document<unknown, {}, TeamMembership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMembership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, TeamMembership>;
