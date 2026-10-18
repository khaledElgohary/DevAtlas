var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';
let ServicesService = class ServicesService {
    serviceModel;
    teamsService;
    membershipService;
    constructor(serviceModel, teamsService, membershipService) {
        this.serviceModel = serviceModel;
        this.teamsService = teamsService;
        this.membershipService = membershipService;
    }
    async findByTeamId(teamId, requesterId) {
        const team = await this.teamsService.findById(teamId);
        if (!team) {
            throw new NotFoundException("Team doesn't exist");
        }
        const membership = await this.membershipService.findMembership(requesterId, team.organizationId.toString());
        if (!membership) {
            throw new ForbiddenException('User is not part of the organization');
        }
        const services = await this.serviceModel
            .find({ teamId, organizationId: team.organizationId.toString() })
            .exec();
        return services.map((service) => {
            return {
                id: service._id.toString(),
                name: service.name,
                kind: service.kind,
                teamId: service.teamId.toString(),
                organizationId: service.organizationId.toString(),
                description: service.description,
            };
        });
    }
    async createService(dto, requesterId) {
        const team = await this.teamsService.findById(dto.teamId);
        if (!team) {
            throw new NotFoundException("Team doesn't exist");
        }
        const membership = await this.membershipService.findMembership(requesterId, team.organizationId.toString());
        if (!membership) {
            throw new ForbiddenException('User is not part of the organization');
        }
        if (membership.role !== 'owner' && membership.role !== 'admin') {
            throw new ForbiddenException('User does not have permission to create a service');
        }
        const service = await this.serviceModel.create({
            name: dto.name,
            kind: dto.kind,
            teamId: dto.teamId,
            organizationId: team.organizationId.toString(),
            description: dto.description,
        });
        return {
            id: service._id.toString(),
            name: service.name,
            description: service.description,
            kind: service.kind,
            teamId: service.teamId.toString(),
            organizationId: service.organizationId.toString(),
        };
    }
};
ServicesService = __decorate([
    Injectable(),
    __param(0, InjectModel(Service.name)),
    __metadata("design:paramtypes", [Function, TeamsService,
        MembershipService])
], ServicesService);
export { ServicesService };
//# sourceMappingURL=services.service.js.map