import type { Connection, Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema.js';
import { MembershipService } from '../membership/membership.service.js';
export declare class OrganizationsService {
    private readonly organizationModel;
    private readonly membershipService;
    private readonly connection;
    constructor(organizationModel: Model<Organization>, membershipService: MembershipService, connection: Connection);
    findBySlug(slug: string): Promise<OrganizationDocument | null>;
    createOrganization(name: string, slug: string, creatorId: string): Promise<OrganizationDocument>;
    listForUser(userId: string): Promise<{
        id: string;
        name: string;
        slug: string;
        role: import("../membership/schemas/membership.schema.js").OrganizationRole;
    }[]>;
}
