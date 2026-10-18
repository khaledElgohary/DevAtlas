var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, Post, Req, UseGuards, Body, } from '@nestjs/common';
import { ServicesService } from './services.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { FetchServicesDto } from './dto/fetch-services-dto.js';
import { CreateServiceDto } from './dto/create-service-dto.js';
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    listServices(params, req) {
        return this.servicesService.findByTeamId(params.teamId, req.session.userId);
    }
    createService(req, dto) {
        return this.servicesService.createService(dto, req.session.userId);
    }
};
__decorate([
    UseGuards(SessionAuthGuard),
    Get(":teamId"),
    __param(0, Param()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FetchServicesDto, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "listServices", null);
__decorate([
    UseGuards(SessionAuthGuard),
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "createService", null);
ServicesController = __decorate([
    Controller('services'),
    __metadata("design:paramtypes", [ServicesService])
], ServicesController);
export { ServicesController };
//# sourceMappingURL=services.controller.js.map