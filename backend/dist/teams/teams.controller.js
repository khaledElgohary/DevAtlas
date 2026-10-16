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
import { Body, Controller, Get, Post, Query, Req, UseGuards, } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { ListTeamsQueryDto } from './dto/list-teams-dto.js';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard.js';
import { CreateTeamDto } from './dto/create-team-dto.js';
let TeamsController = class TeamsController {
    teamsService;
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    async createTeam(req, dto) {
        return this.teamsService.createTeam(dto.name, dto.organizationId, req.session.userId);
    }
    async listTeams(query, req) {
        return this.teamsService.findByOrganizationId(query.organizationId, req.session.userId);
    }
};
__decorate([
    UseGuards(SessionAuthGuard),
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "createTeam", null);
__decorate([
    UseGuards(SessionAuthGuard),
    Get(),
    __param(0, Query()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListTeamsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "listTeams", null);
TeamsController = __decorate([
    Controller('teams'),
    __metadata("design:paramtypes", [TeamsService])
], TeamsController);
export { TeamsController };
//# sourceMappingURL=teams.controller.js.map