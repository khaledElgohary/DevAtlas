import { TeamMembershipService } from './team-membership.service.js';
import type { Request } from 'express';
import { AddTeamMemberDto } from './dto/add-team-member-dto.js';
import { TeamParamsDto } from './dto/team-params-dto.js';
export declare class TeamMembershipController {
    private readonly teamMembershipService;
    constructor(teamMembershipService: TeamMembershipService);
    addMember(req: Request, dto: AddTeamMemberDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/team-membership.schema.js").TeamMembership, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/team-membership.schema.js").TeamMembership & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    list(params: TeamParamsDto, req: Request): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    removeMember(params: AddTeamMemberDto, req: Request): Promise<{
        message: string;
    }>;
    listMyTeams(req: Request): Promise<{
        id: string;
        name: string;
        organizationId: string;
    }[]>;
}
