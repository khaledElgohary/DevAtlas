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
import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Team } from './schemas/teams.schema.js';
import { MembershipService } from '../membership/membership.service.js';
let TeamsService = class TeamsService {
    teamModel;
    membershipService;
    constructor(teamModel, membershipService) {
        this.teamModel = teamModel;
        this.membershipService = membershipService;
    }
    async findByOrganizationId(organizationId, userId) {
        const membership = await this.membershipService.findMembership(userId, organizationId);
        if (membership === null) {
            throw new ForbiddenException("User is not a member of this organization.");
        }
        return this.teamModel
            .find({ organizationId })
            .exec();
    }
    async createTeam(name, organizationId, creatorId) {
        await this.requireOwnerOrAdmin(creatorId, organizationId);
        try {
            const createdTeam = await this.teamModel.create({
                name: name.trim(),
                organizationId
            });
            return createdTeam;
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException("A team with this name already exists in the organization.");
            }
            throw error;
        }
    }
    async requireOwnerOrAdmin(userId, organizationId) {
        const membership = await this.membershipService.findMembership(userId, organizationId);
        if (membership === null || (membership.role !== 'owner' && membership.role !== 'admin')) {
            throw new ForbiddenException("This action requires the user to be an owner or admin of the organization.");
        }
    }
    async findById(teamId) {
        const team = await this.teamModel.findById(teamId).exec();
        return team;
    }
};
TeamsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Team.name)),
    __metadata("design:paramtypes", [Model,
        MembershipService])
], TeamsService);
export { TeamsService };
//# sourceMappingURL=teams.service.js.map