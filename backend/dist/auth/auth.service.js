var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { MongoServerError } from 'mongodb';
import * as argon2 from 'argon2';
let AuthService = class AuthService {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(dto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const passwordHash = await argon2.hash(dto.password);
        try {
            const user = await this.usersService.createUser(dto.name, dto.email, passwordHash);
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            };
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000) {
                throw new ConflictException('User with this email already exists');
            }
            throw error;
        }
    }
    async validateCredentials(dto) {
        const user = await this.usersService.findByEmailWithPassword(dto.email);
        if (!user) {
            throw new ConflictException('Invalid email or password');
        }
        const passwordMatches = await argon2.verify(user.passwordHash, dto.password);
        if (!passwordMatches) {
            throw new ConflictException('Invalid email or password');
        }
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    }
    async getCurrentUser(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new ConflictException('User not found');
        }
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map