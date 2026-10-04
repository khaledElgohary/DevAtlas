import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import type { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    login(dto: LoginDto, req: Request): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    me(req: Request): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
