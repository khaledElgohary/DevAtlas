import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';

import { ServicesService } from './services.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { FetchServicesDto } from './dto/fetch-services-dto.js';
import { CreateServiceDto } from './dto/create-service-dto.js';
import type { Request } from 'express';


@Controller('services')
export class ServicesController {
    constructor(
        private readonly servicesService: ServicesService 
    ){}


    @UseGuards(SessionAuthGuard)
    @Get(":teamId")
    listServices(
        @Param() params: FetchServicesDto,
        @Req() req: Request
    ){
        return this.servicesService.findByTeamId(params.teamId, req.session.userId!)
    }


    @UseGuards(SessionAuthGuard)
    @Post()
    createService(
        @Req() req:Request,
        @Body() dto: CreateServiceDto
    ){
        return this.servicesService.createService(dto, req.session.userId!)
    }

}
