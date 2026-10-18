import type { Model } from 'mongoose';
import { Service } from './schemas/service.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';
import { CreateServiceDto } from './dto/create-service-dto.js';
export declare class ServicesService {
    private readonly serviceModel;
    private readonly teamsService;
    private readonly membershipService;
    constructor(serviceModel: Model<Service>, teamsService: TeamsService, membershipService: MembershipService);
    findByTeamId(teamId: string, requesterId: string): Promise<{
        id: string;
        name: string;
        kind: "api" | "worker" | "web-app" | "library";
        teamId: string;
        organizationId: string;
        description: string;
    }[]>;
    createService(dto: CreateServiceDto, requesterId: string): Promise<{
        id: string;
        name: string;
        description: string;
        kind: "api" | "worker" | "web-app" | "library";
        teamId: string;
        organizationId: string;
    }>;
}
