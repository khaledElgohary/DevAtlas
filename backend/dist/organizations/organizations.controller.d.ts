import type { Request } from 'express';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { OrganizationsService } from './organizations.service.js';
import { OrganizationParamsDto } from './dto/organization-param.dto.js';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(dto: CreateOrganizationDto, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/organization.schema.js").Organization, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/organization.schema.js").Organization & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    list(req: Request): Promise<{
        id: string;
        name: string;
        slug: string;
        role: import("../membership/schemas/membership.schema.js").OrganizationRole;
    }[]>;
    listMembers(params: OrganizationParamsDto, req: Request): Promise<{
        userId: string;
        name: string | null;
        email: string | null;
        role: import("../membership/schemas/membership.schema.js").OrganizationRole;
    }[]>;
}
