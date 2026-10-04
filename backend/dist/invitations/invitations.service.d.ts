import type { Model, Connection } from 'mongoose';
import { Invitation } from './schemas/invitation.schema.js';
import { MembershipService } from '../membership/membership.service.js';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
import { UsersService } from '../users/users.service.js';
export declare class InvitationsService {
    private readonly invitationModel;
    private readonly membershipService;
    private readonly usersService;
    private readonly connection;
    constructor(invitationModel: Model<Invitation>, membershipService: MembershipService, usersService: UsersService, connection: Connection);
    private requireOwnerOrAdmin;
    createInvitation(dto: CreateInvitationDto, inviterId: string): Promise<{
        id: string;
        email: string;
        role: "admin" | "member";
        expiresAt: Date;
        token: string;
    }>;
    private findValidInvitation;
    private requireMatchingUser;
    acceptInvitation(token: string, userId: string): Promise<{
        organizationId: string;
        role: "admin" | "member";
    }>;
}
