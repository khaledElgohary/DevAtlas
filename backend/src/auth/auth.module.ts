import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {UsersModule} from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { OrganizationsModule } from '../organizations/organizations.module.js';

@Module({
  imports: [UsersModule, OrganizationsModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
