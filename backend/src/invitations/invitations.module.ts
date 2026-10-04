import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationsService } from './invitations.service.js';
import {
  Invitation,
  InvitationSchema,
} from './schemas/invitation.schema.js';
import { MembershipModule } from '../membership/membership.module.js';
import { InvitationsController } from './invitations.controller.js';
import { UsersModule } from '../users/users.module.js';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Invitation.name, schema:InvitationSchema},
    ]),
    MembershipModule,
    UsersModule,
  ],
  providers: [InvitationsService],
  exports: [InvitationsService],
  controllers: [InvitationsController]
})
export class InvitationsModule {}
