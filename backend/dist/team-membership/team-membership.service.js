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
import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMembership } from './schemas/team-membership.schema.js';
import { TeamsService } from '../teams/teams.service.js';
import { MembershipService } from '../membership/membership.service.js';
import { MongoServerError } from 'mongodb';
import { UsersService } from '../users/users.service.js';
let TeamMembershipService = class TeamMembershipService {
    teamMembershipModel;
    teamsService;
    membershipService;
    usersService;
    constructor(teamMembershipModel, teamsService, membershipService, usersService) {
        this.teamMembershipModel = teamMembershipModel;
        this.teamsService = teamsService;
        this.membershipService = membershipService;
        this.usersService = usersService;
    }
    async findMembership(teamId, userId) {
        return this.teamMembershipModel
            .findOne({ teamId, userId })
            .exec();
    }
    async createMembership(teamId, userId) {
        return this.teamMembershipModel
            .create({ teamId, userId });
    }
    async addMember(teamId, userId, requesterId) {
        const team = await this.teamsService.findById(teamId);
        if (!team) {
            throw new NotFoundException("Team not found");
        }
        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId));
        if (!membership || (membership.role !== 'owner' && membership.role !== 'admin')) {
            throw new ForbiddenException("Requester does not have permission to add members to this team");
        }
        const existingMembership = await this.membershipService.findMembership(userId, String(team.organizationId));
        if (!existingMembership) {
            throw new ForbiddenException("User must belong to this organization before joining its teams");
        }
        try {
            return await this.createMembership(teamId, userId);
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException("User is already a member of this team");
            }
            throw error;
        }
    }
    async requireOrganizationMember(teamId, requesterId) {
        const team = await this.teamsService.findById(teamId);
        if (!team) {
            throw new NotFoundException("Team Not Found");
        }
        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId));
        if (!membership) {
            throw new ForbiddenException("User doesn't belong to the organization");
        }
        return team;
    }
    async listMembers(teamId, requesterId) {
        await this.requireOrganizationMember(teamId, requesterId);
        const memberships = await this.teamMembershipModel.find({ teamId }).exec();
        const users = await this.usersService.findByIds(memberships.map((membership) => membership.userId.toString()));
        return users.map((user) => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email
        }));
    }
    async removeMember(teamId, userId, requesterId) {
        const team = await this.requireOrganizationMember(teamId, requesterId);
        const membership = await this.membershipService.findMembership(requesterId, String(team.organizationId));
        if (!membership) {
            throw new ForbiddenException("Requester does not have permission to remove members from this team");
        }
        if (membership.role === "member") {
            throw new ForbiddenException("Only organization owners and admins can remove team members");
        }
        const count = await this.teamMembershipModel.deleteOne({ teamId, userId }).exec();
        if (count.deletedCount === 0) {
            throw new NotFoundException("Membership not found");
        }
        return { message: "Membership successfully removed" };
    }
};
TeamMembershipService = __decorate([
    Injectable(),
    __param(0, InjectModel(TeamMembership.name)),
    __metadata("design:paramtypes", [Model,
        TeamsService,
        MembershipService,
        UsersService])
], TeamMembershipService);
export { TeamMembershipService };
//# sourceMappingURL=team-membership.service.js.map