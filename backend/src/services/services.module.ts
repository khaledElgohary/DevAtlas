import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services.service.js';
import { Service, ServiceSchema } from './schemas/service.schema.js';
import { TeamsModule } from '../teams/teams.module.js';
import { MembershipModule } from '../membership/membership.module.js';
import { ServicesController } from './services.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    TeamsModule,
    MembershipModule
  ],
  providers: [ServicesService],
  exports: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
