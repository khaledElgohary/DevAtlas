import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ServicesService } from './services.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { FetchServicesDto } from './dto/fetch-services-dto.js';
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

}
