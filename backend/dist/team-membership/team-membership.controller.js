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
import { Body, Controller, Get, Param, Post, Req, UseGuards, Delete, } from '@nestjs/common';
import { TeamMembershipService } from './team-membership.service.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { AddTeamMemberDto } from './dto/add-team-member-dto.js';
import { TeamParamsDto } from './dto/team-params-dto.js';
let TeamMembershipController = class TeamMembershipController {
    teamMembershipService;
    constructor(teamMembershipService) {
        this.teamMembershipService = teamMembershipService;
    }
    async addMember(req, dto) {
        return this.teamMembershipService.addMember(dto.teamId, dto.userId, req.session.userId);
    }
    list(params, req) {
        return this.teamMembershipService.listMembers(params.teamId, req.session.userId);
    }
    async removeMember(params, req) {
        return this.teamMembershipService.removeMember(params.teamId, params.userId, req.session.userId);
    }
};
__decorate([
    UseGuards(SessionAuthGuard),
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddTeamMemberDto]),
    __metadata("design:returntype", Promise)
], TeamMembershipController.prototype, "addMember", null);
__decorate([
    UseGuards(SessionAuthGuard),
    Get(":teamId/members"),
    __param(0, Param()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TeamParamsDto, Object]),
    __metadata("design:returntype", void 0)
], TeamMembershipController.prototype, "list", null);
__decorate([
    UseGuards(SessionAuthGuard),
    Delete(":teamId/members/:userId"),
    __param(0, Param()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddTeamMemberDto, Object]),
    __metadata("design:returntype", Promise)
], TeamMembershipController.prototype, "removeMember", null);
TeamMembershipController = __decorate([
    Controller('team-membership'),
    __metadata("design:paramtypes", [TeamMembershipService])
], TeamMembershipController);
export { TeamMembershipController };
//# sourceMappingURL=team-membership.controller.js.map