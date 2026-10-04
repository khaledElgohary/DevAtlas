import type { HydratedDocument } from 'mongoose';
export type OrganizationDocument = HydratedDocument<Organization>;
export declare class Organization {
    name: string;
    slug: string;
}
export declare const OrganizationSchema: import("mongoose").Schema<Organization, import("mongoose").Model<Organization, any, any, any, any, any, Organization>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Organization, import("mongoose").Document<unknown, {}, Organization, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Organization & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Organization, import("mongoose").Document<unknown, {}, Organization, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Organization>;
