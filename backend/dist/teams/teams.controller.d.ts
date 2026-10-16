import { TeamsService } from './teams.service.js';
import type { Request } from 'express';
import { ListTeamsQueryDto } from './dto/list-teams-dto.js';
import { CreateTeamDto } from './dto/create-team-dto.js';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    createTeam(req: Request, dto: CreateTeamDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/teams.schema.js").Team, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/teams.schema.js").Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    listTeams(query: ListTeamsQueryDto, req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/teams.schema.js").Team, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/teams.schema.js").Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
