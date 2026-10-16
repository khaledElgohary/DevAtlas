import { Model } from 'mongoose';
import { TeamMembership, TeamMembershipDocument } from './schemas/team-membership.schema.js';
export declare class TeamMembershipService {
    private readonly teamMembershipModel;
    constructor(teamMembershipModel: Model<TeamMembership>);
    findMembership(teamId: string, userId: string): Promise<TeamMembershipDocument | null>;
}
