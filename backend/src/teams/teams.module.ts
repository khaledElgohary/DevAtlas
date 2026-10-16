import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsService } from './teams.service.js';
import { Team, TeamSchema } from './schemas/teams.schema.js';
import { MembershipModule } from '../membership/membership.module.js';
import { TeamsController } from './teams.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    MembershipModule
  ],
  exports: [TeamsService],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {

}
