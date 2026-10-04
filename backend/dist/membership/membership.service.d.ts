import { Model, type ClientSession } from 'mongoose';
import { Membership, type MembershipDocument, type OrganizationRole } from './schemas/membership.schema.js';
export declare class MembershipService {
    private readonly membershipModel;
    constructor(membershipModel: Model<Membership>);
    findMembership(userId: string, organizationId: string): Promise<MembershipDocument | null>;
    createMembership(userId: string, organizationId: string, role?: OrganizationRole, session?: ClientSession): Promise<MembershipDocument>;
    findByUserId(userId: string): Promise<MembershipDocument[]>;
    findByOrganizationId(organizationId: string): Promise<MembershipDocument[]>;
}
