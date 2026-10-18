var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services.service.js';
import { Service, ServiceSchema } from './schemas/service.schema.js';
import { TeamsModule } from '../teams/teams.module.js';
import { MembershipModule } from '../membership/membership.module.js';
import { ServicesController } from './services.controller.js';
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
            TeamsModule,
            MembershipModule
        ],
        providers: [ServicesService],
        exports: [ServicesService],
        controllers: [ServicesController],
    })
], ServicesModule);
export { ServicesModule };
//# sourceMappingURL=services.module.js.map