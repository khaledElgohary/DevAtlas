import { Module } from '@nestjs/common';
import { TeamMembershipService } from './team-membership.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMembership, TeamMembershipSchema } from './schemas/team-membership.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TeamMembership.name, schema: TeamMembershipSchema }]),
  ],
  providers: [TeamMembershipService],
  exports: [TeamMembershipService]
})
export class TeamMembershipModule {}
