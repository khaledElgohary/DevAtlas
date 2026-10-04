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
import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Invitation } from './schemas/invitation.schema.js';
import { MembershipService } from '../membership/membership.service.js';
import { createHash, randomBytes } from 'crypto';
import { UsersService } from '../users/users.service.js';
let InvitationsService = class InvitationsService {
    invitationModel;
    membershipService;
    usersService;
    connection;
    constructor(invitationModel, membershipService, usersService, connection) {
        this.invitationModel = invitationModel;
        this.membershipService = membershipService;
        this.usersService = usersService;
        this.connection = connection;
    }
    async requireOwnerOrAdmin(userId, organizationId) {
        const membership = await this.membershipService.findMembership(userId, organizationId);
        if (!membership ||
            !['owner', 'admin'].includes(membership.role)) {
            throw new ForbiddenException('Only organization owners and admins can invite users');
        }
    }
    async createInvitation(dto, inviterId) {
        await this.requireOwnerOrAdmin(inviterId, dto.organizationId);
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            const membership = await this.membershipService.findMembership(existingUser._id.toString(), dto.organizationId);
            if (membership) {
                throw new ConflictException('User is already a member of this organization');
            }
        }
        const token = randomBytes(32).toString('hex');
        const tokenHash = createHash('sha256').update(token).digest('hex');
        const invitation = await this.invitationModel.create({
            organizationId: dto.organizationId,
            email: dto.email,
            role: dto.role,
            invitedBy: inviterId,
            tokenHash,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        return {
            id: invitation._id.toString(),
            email: invitation.email,
            role: invitation.role,
            expiresAt: invitation.expiresAt,
            token,
        };
    }
    async findValidInvitation(token) {
        const tokenHash = createHash('sha256')
            .update(token)
            .digest('hex');
        return this.invitationModel
            .findOne({
            tokenHash,
            expiresAt: { $gt: new Date() },
        })
            .exec();
    }
    async requireMatchingUser(userId, invitationEmail) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (user.email !== invitationEmail) {
            throw new ForbiddenException('This invitation belongs to a different email address');
        }
    }
    async acceptInvitation(token, userId) {
        const invitation = await this.findValidInvitation(token);
        if (!invitation) {
            throw new BadRequestException('Invitation is invalid or expired');
        }
        await this.requireMatchingUser(userId, invitation.email);
        const session = await this.connection.startSession();
        try {
            return await session.withTransaction(async () => {
                const claimedInvitation = await this.invitationModel.findOneAndUpdate({
                    _id: invitation._id,
                    acceptedAt: null,
                    expiresAt: { $gt: new Date() },
                }, {
                    $set: { acceptedAt: new Date() }
                }, { session, new: true });
                if (!claimedInvitation) {
                    throw new BadRequestException('Invitation is invalid or expired');
                }
                await this.membershipService.createMembership(userId, claimedInvitation.organizationId.toString(), claimedInvitation.role, session);
                return {
                    organizationId: claimedInvitation.organizationId.toString(),
                    role: claimedInvitation.role,
                };
            });
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException('Duplicate key error');
            }
            throw error;
        }
        finally {
            await session.endSession();
        }
    }
};
InvitationsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Invitation.name)),
    __param(3, InjectConnection()),
    __metadata("design:paramtypes", [Function, MembershipService,
        UsersService, Function])
], InvitationsService);
export { InvitationsService };
//# sourceMappingURL=invitations.service.js.map