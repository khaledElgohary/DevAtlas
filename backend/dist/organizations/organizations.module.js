var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsService } from './organizations.service.js';
import { Organization, OrganizationSchema, } from './schemas/organization.schema.js';
import { MembershipModule } from '../membership/membership.module.js';
import { OrganizationsController } from './organizations.controller.js';
let OrganizationsModule = class OrganizationsModule {
};
OrganizationsModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([
                { name: Organization.name, schema: OrganizationSchema },
            ]),
            MembershipModule
        ],
        providers: [OrganizationsService],
        exports: [OrganizationsService],
        controllers: [OrganizationsController]
    })
], OrganizationsModule);
export { OrganizationsModule };
//# sourceMappingURL=organizations.module.js.map