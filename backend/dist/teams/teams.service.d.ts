import { Model } from 'mongoose';
import { Team, type TeamDocument } from './schemas/teams.schema.js';
import { MembershipService } from '../membership/membership.service.js';
export declare class TeamsService {
    private readonly teamModel;
    private readonly membershipService;
    constructor(teamModel: Model<Team>, membershipService: MembershipService);
    findByOrganizationId(organizationId: string, userId: string): Promise<TeamDocument[]>;
    createTeam(name: string, organizationId: string, creatorId: string): Promise<TeamDocument>;
    private requireOwnerOrAdmin;
    findById(teamId: string): Promise<TeamDocument | null>;
}
