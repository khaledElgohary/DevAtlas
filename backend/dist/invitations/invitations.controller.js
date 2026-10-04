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
import { Body, Controller, Post, Req, UseGuards, } from '@nestjs/common';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { CreateInvitationDto } from './dto/create-invitation.dto.js';
import { AcceptInvitationDto } from './dto/accept-invitation-dto.js';
import { InvitationsService } from './invitations.service.js';
let InvitationsController = class InvitationsController {
    invitationsService;
    constructor(invitationsService) {
        this.invitationsService = invitationsService;
    }
    create(dto, req) {
        return this.invitationsService.createInvitation(dto, req.session.userId);
    }
    accept(dto, req) {
        return this.invitationsService.acceptInvitation(dto.token, req.session.userId);
    }
};
__decorate([
    Post(),
    UseGuards(SessionAuthGuard),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateInvitationDto, Object]),
    __metadata("design:returntype", void 0)
], InvitationsController.prototype, "create", null);
__decorate([
    Post('accept'),
    UseGuards(SessionAuthGuard),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcceptInvitationDto, Object]),
    __metadata("design:returntype", void 0)
], InvitationsController.prototype, "accept", null);
InvitationsController = __decorate([
    Controller('invitations'),
    __metadata("design:paramtypes", [InvitationsService])
], InvitationsController);
export { InvitationsController };
//# sourceMappingURL=invitations.controller.js.map