var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationsService } from './invitations.service.js';
import { Invitation, InvitationSchema, } from './schemas/invitation.schema.js';
import { MembershipModule } from '../membership/membership.module.js';
import { InvitationsController } from './invitations.controller.js';
import { UsersModule } from '../users/users.module.js';
let InvitationsModule = class InvitationsModule {
};
InvitationsModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([
                { name: Invitation.name, schema: InvitationSchema },
            ]),
            MembershipModule,
            UsersModule,
        ],
        providers: [InvitationsService],
        exports: [InvitationsService],
        controllers: [InvitationsController]
    })
], InvitationsModule);
export { InvitationsModule };
//# sourceMappingURL=invitations.module.js.map