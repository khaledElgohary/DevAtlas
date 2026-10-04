import { Body, Controller, Post, HttpCode, Req, UnauthorizedException, Get, Res, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from './guards/session-auth.guard.js';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import {LoginDto} from './dto/login.dto.js';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto);
    }


    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginDto, @Req() req: Request){
        const user = await this.authService.validateCredentials(dto);

        await new Promise<void>((resolve, reject) => {
            req.session.regenerate((error) => {
                if (error) reject(error);
                else resolve();
            });
        });

        req.session.userId = user.id;
        
        await new Promise<void>((resolve, reject) => {
            req.session.save((error) => {
                if (error) reject(error);
                else resolve();
            });
        });

        return user;
    }

    @Post('logout')
    @HttpCode(200)
    async logout(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
    ){
        await new Promise<void>((resolve, reject) => {
            req.session.destroy((error) => {
                if(error) reject(error);
                else resolve();
            });
        });

        res.clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        return {message: 'Logged out successfully'};
    }


    @Get('me')
    @UseGuards(SessionAuthGuard)
    async me(@Req() req: Request){
        const userId = req.session.userId;

        if(!userId){
            throw new UnauthorizedException('You must be logged in');
        }

        return this.authService.getCurrentUser(userId);
    }
}
