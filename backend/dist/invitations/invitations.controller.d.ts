import type { Request } from 'express';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
import { AcceptInvitationDto } from './dto/accept-invitation-dto.js';
import { InvitationsService } from './invitations.service.js';
export declare class InvitationsController {
    private readonly invitationsService;
    constructor(invitationsService: InvitationsService);
    create(dto: CreateInvitationDto, req: Request): Promise<{
        id: string;
        email: string;
        role: "admin" | "member";
        expiresAt: Date;
        token: string;
    }>;
    accept(dto: AcceptInvitationDto, req: Request): Promise<{
        organizationId: string;
        role: "admin" | "member";
    }>;
}
