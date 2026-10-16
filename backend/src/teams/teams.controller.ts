import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import type { Request } from 'express';
import { ListTeamsQueryDto } from './dto/list-teams-dto.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { CreateTeamDto } from './dto/create-team-dto.js';


@Controller('teams')
export class TeamsController {
    constructor(
        private readonly teamsService: TeamsService
    ){}

    @UseGuards(SessionAuthGuard)
    @Post()
    async createTeam(
        @Req() req: Request,
        @Body() dto: CreateTeamDto
    ){
        return this.teamsService.createTeam(dto.name, dto.organizationId, req.session.userId!);
    }


    @UseGuards(SessionAuthGuard)
    @Get()
    async listTeams(
        @Query() query: ListTeamsQueryDto,
        @Req() req: Request,
    ){
        return this.teamsService.findByOrganizationId(
            query.organizationId,
            req.session.userId!
        )
    }
}

