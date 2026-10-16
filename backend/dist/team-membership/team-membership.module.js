var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TeamMembershipService } from './team-membership.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMembership, TeamMembershipSchema } from './schemas/team-membership.schema.js';
let TeamMembershipModule = class TeamMembershipModule {
};
TeamMembershipModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([{ name: TeamMembership.name, schema: TeamMembershipSchema }]),
        ],
        providers: [TeamMembershipService],
        exports: [TeamMembershipService]
    })
], TeamMembershipModule);
export { TeamMembershipModule };
//# sourceMappingURL=team-membership.module.js.map