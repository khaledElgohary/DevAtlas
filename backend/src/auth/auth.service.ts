import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { MongoServerError } from 'mongodb';
import { RegisterDto } from './dto/register.dto.js';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ){}

    async register(dto: RegisterDto){
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const passwordHash = await argon2.hash(dto.password);

        try{
            const user = await this.usersService.createUser(
                dto.name,
                dto.email,
                passwordHash,
            );

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            };
        }
        catch (error) {
            if (error instanceof MongoServerError && error.code === 11000){
                throw new ConflictException('User with this email already exists');
            }
            throw error;
        }
    }

    async validateCredentials(dto: LoginDto){
        const user = await this.usersService.findByEmailWithPassword(dto.email);

        if(!user) {
            throw new ConflictException('Invalid email or password');
        }

        const passwordMatches = await argon2.verify(
            user.passwordHash,
            dto.password
        );

        if(!passwordMatches) {
            throw new ConflictException('Invalid email or password');
        }

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        }
    }


    async getCurrentUser(userId: string){
        const user = await this.usersService.findById(userId);

        if (!user){
            throw new ConflictException('User not found');
        }

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        }
    }
}


