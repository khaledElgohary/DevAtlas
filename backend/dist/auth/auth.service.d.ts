import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    validateCredentials(dto: LoginDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    getCurrentUser(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
