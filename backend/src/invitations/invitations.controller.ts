import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
import { AcceptInvitationDto } from './dto/accept-invitation-dto.js';
import { InvitationsService } from './invitations.service.js';

@Controller('invitations')
export class InvitationsController {
    constructor(
        private readonly invitationsService: InvitationsService
    ){}

    @Post()
    @UseGuards(SessionAuthGuard)
    create(
        @Body() dto: CreateInvitationDto,
        @Req() req: Request,
    ){
        return this.invitationsService.createInvitation(
            dto,
            req.session.userId!,
        );
    }


    @Post('accept')
    @UseGuards(SessionAuthGuard)
    accept(
        @Body() dto: AcceptInvitationDto,
        @Req() req: Request,
    ){
        return this.invitationsService.acceptInvitation(
            dto.token,
            req.session.userId!,
        );
    }
}
