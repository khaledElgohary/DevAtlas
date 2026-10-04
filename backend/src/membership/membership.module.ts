import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipService } from './membership.service.js';
import {
  Membership,
  MembershipSchema,
} from './schemas/membership.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Membership.name, schema: MembershipSchema }]),
  ],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
