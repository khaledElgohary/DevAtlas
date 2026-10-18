import { Model } from 'mongoose';
import { TeamMembership, TeamMembershipDocument } from './schemas/team-membership.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';
import { UsersService } from '../users/users.service.js';
export declare class TeamMembershipService {
    private readonly teamMembershipModel;
    private readonly teamsService;
    private readonly membershipService;
    private readonly usersService;
    constructor(teamMembershipModel: Model<TeamMembership>, teamsService: TeamsService, membershipService: MembershipService, usersService: UsersService);
    findMembership(teamId: string, userId: string): Promise<TeamMembershipDocument | null>;
    private createMembership;
    addMember(teamId: string, userId: string, requesterId: string): Promise<TeamMembershipDocument>;
    private requireOrganizationMember;
    listMembers(teamId: string, requesterId: string): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    removeMember(teamId: string, userId: string, requesterId: string): Promise<{
        message: string;
    }>;
    findByUserId(userId: string): Promise<TeamMembershipDocument[]>;
    listMyTeams(userId: string): Promise<{
        id: string;
        name: string;
        organizationId: string;
    }[]>;
}
