import type { Connection, Model } from 'mongoose';
import { Organization, OrganizationDocument } from './schemas/organization.schema.js';
import { MembershipService } from '../membership/membership.service.js';
import { UsersService } from '../users/users.service.js';
export declare class OrganizationsService {
    private readonly organizationModel;
    private readonly membershipService;
    private readonly usersService;
    private readonly connection;
    constructor(organizationModel: Model<Organization>, membershipService: MembershipService, usersService: UsersService, connection: Connection);
    findBySlug(slug: string): Promise<OrganizationDocument | null>;
    createOrganization(name: string, slug: string, creatorId: string): Promise<OrganizationDocument>;
    listForUser(userId: string): Promise<{
        id: string;
        name: string;
        slug: string;
        role: import("../membership/schemas/membership.schema.js").OrganizationRole;
    }[]>;
    private requireMembership;
    listMembers(userId: string, organizationId: string): Promise<{
        userId: string;
        name: string | null;
        email: string | null;
        role: import("../membership/schemas/membership.schema.js").OrganizationRole;
    }[]>;
}
