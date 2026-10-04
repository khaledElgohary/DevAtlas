import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { OrganizationsService } from './organizations.service.js';
import { OrganizationParamsDto } from './dto/organization-param.dto.js';

@Controller('organizations')
export class OrganizationsController {
    constructor(
        private readonly organizationsService: OrganizationsService
    ){}

    @Post()
    @UseGuards(SessionAuthGuard)
    create(
        @Body() dto: CreateOrganizationDto,
        @Req() req: Request,
    ){
        return this.organizationsService.createOrganization(
            dto.name,
            dto.slug,
            req.session.userId!,
        )
    }

    
    @Get()
    @UseGuards(SessionAuthGuard)
    list(@Req() req: Request){
        return this.organizationsService.listForUser(
            req.session.userId!,
        )
    }

    @Get(':organizationId/members')
    @UseGuards(SessionAuthGuard)
    listMembers(
        @Param() params: OrganizationParamsDto,
        @Req() req: Request,
    ){
        return this.organizationsService.listMembers(
            req.session.userId!,
            params.organizationId
        )
    }
}

