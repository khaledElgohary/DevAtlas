import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TeamMembershipService } from './team-membership.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import type { Request } from 'express';
import { AddTeamMemberDto } from './dto/add-team-member-dto.js';
import { TeamParamsDto } from './dto/team-params-dto.js';



@Controller('team-membership')
export class TeamMembershipController {
    constructor(
        private readonly teamMembershipService: TeamMembershipService
    ){}

    @UseGuards(SessionAuthGuard)
    @Post()
    async addMember(
        @Req() req: Request,
        @Body() dto: AddTeamMemberDto
    ){
        return this.teamMembershipService.addMember(dto.teamId, dto.userId, req.session.userId!)
    }

    @UseGuards(SessionAuthGuard)
    @Get(":teamId/members")
    list(
        @Param() params: TeamParamsDto,
        @Req() req: Request
    ){
        return this.teamMembershipService.listMembers(params.teamId, req.session.userId!)
    }


    @UseGuards(SessionAuthGuard)
    @Delete(":teamId/members/:userId")
    async removeMember(
        @Param() params: AddTeamMemberDto,
        @Req() req: Request
    ){
        return this.teamMembershipService.removeMember(params.teamId, params.userId, req.session.userId!)
    }

    @UseGuards(SessionAuthGuard)
    @Get("/me/teams")
    async listMyTeams(
        @Req() req:Request,
    ){
        return this.teamMembershipService.listMyTeams(req.session.userId!)
    }


}
