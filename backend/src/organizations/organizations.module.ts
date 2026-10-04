import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsService } from './organizations.service.js';
import {
  Organization,
  OrganizationSchema,
} from './schemas/organization.schema.js';

import { MembershipModule } from '../membership/membership.module.js';
import { OrganizationsController } from './organizations.controller.js';
import { UsersModule } from '../users/users.module.js';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    MembershipModule,
    UsersModule
  ],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
  controllers: [OrganizationsController]
})
export class OrganizationsModule {}
