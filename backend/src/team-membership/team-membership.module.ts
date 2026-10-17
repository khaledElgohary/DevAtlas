import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { TeamMembershipService } from './team-membership.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMembership, TeamMembershipSchema } from './schemas/team-membership.schema.js';
import { TeamsModule } from '../teams/teams.module.js';
import { MembershipModule } from '../membership/membership.module.js';
import { TeamMembershipController } from './team-membership.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TeamMembership.name, schema: TeamMembershipSchema }]),
    TeamsModule,
    MembershipModule,
    UsersModule
  ],
  providers: [TeamMembershipService],
  exports: [TeamMembershipService],
  controllers: [TeamMembershipController]
})
export class TeamMembershipModule {}
