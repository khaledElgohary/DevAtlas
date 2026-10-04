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
import { Body, Controller, Post, HttpCode, Req, UnauthorizedException, Get, Res, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from './guards/session-auth.guard.js';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto) {
        return this.authService.register(dto);
    }
    async login(dto, req) {
        const user = await this.authService.validateCredentials(dto);
        await new Promise((resolve, reject) => {
            req.session.regenerate((error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        });
        req.session.userId = user.id;
        await new Promise((resolve, reject) => {
            req.session.save((error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        });
        return user;
    }
    async logout(req, res) {
        await new Promise((resolve, reject) => {
            req.session.destroy((error) => {
                if (error)
                    reject(error);
                else
                    resolve();
            });
        });
        res.clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return { message: 'Logged out successfully' };
    }
    async me(req) {
        const userId = req.session.userId;
        if (!userId) {
            throw new UnauthorizedException('You must be logged in');
        }
        return this.authService.getCurrentUser(userId);
    }
};
__decorate([
    Post('register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    Post('login'),
    HttpCode(200),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('logout'),
    HttpCode(200),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Get('me'),
    UseGuards(SessionAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map