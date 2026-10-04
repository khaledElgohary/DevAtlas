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
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Organization } from './schemas/organization.schema.js';
import { MembershipService } from '../membership/membership.service.js';
import { UsersService } from '../users/users.service.js';
let OrganizationsService = class OrganizationsService {
    organizationModel;
    membershipService;
    usersService;
    connection;
    constructor(organizationModel, membershipService, usersService, connection) {
        this.organizationModel = organizationModel;
        this.membershipService = membershipService;
        this.usersService = usersService;
        this.connection = connection;
    }
    async findBySlug(slug) {
        return this.organizationModel
            .findOne({ slug: slug.trim().toLowerCase() })
            .exec();
    }
    async createOrganization(name, slug, creatorId) {
        const session = await this.connection.startSession();
        try {
            return await session.withTransaction(async () => {
                const [organization] = await this.organizationModel.create([{
                        name: name.trim(),
                        slug: slug.trim().toLowerCase()
                    }], { session });
                await this.membershipService.createMembership(creatorId, organization._id.toString(), 'owner', session);
                return organization;
            });
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException('An organization with this slug already exists');
            }
            ;
            throw error;
        }
        finally {
            await session.endSession();
        }
    }
    async listForUser(userId) {
        const memberships = await this.membershipService.findByUserId(userId);
        const organizations = await this.organizationModel
            .find({
            _id: { $in: memberships.map((membership) => membership.organizationId) },
        })
            .exec();
        return organizations.map((organization) => ({
            id: organization._id.toString(),
            name: organization.name,
            slug: organization.slug,
            role: memberships.find((membership) => membership.organizationId.equals(organization._id)).role,
        }));
    }
    async requireMembership(userId, organizationId) {
        const membership = await this.membershipService.findMembership(userId, organizationId);
        if (!membership) {
            throw new ForbiddenException('User is not a member of this organization');
        }
        return membership;
    }
    async listMembers(userId, organizationId) {
        await this.requireMembership(userId, organizationId);
        const memberships = await this.membershipService.findByOrganizationId(organizationId);
        const users = await this.usersService.findByIds(memberships.map((membership) => membership.userId.toString()));
        const usersById = new Map(users.map((user) => [user._id.toString(), user]));
        return memberships.map((membership) => {
            const memberId = membership.userId.toString();
            const user = usersById.get(memberId);
            return {
                userId: memberId,
                name: user?.name ?? null,
                email: user?.email ?? null,
                role: membership.role,
            };
        });
    }
};
OrganizationsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Organization.name)),
    __param(3, InjectConnection()),
    __metadata("design:paramtypes", [Function, MembershipService,
        UsersService, Function])
], OrganizationsService);
export { OrganizationsService };
//# sourceMappingURL=organizations.service.js.map