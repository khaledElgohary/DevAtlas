import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { OrganizationsService } from '../organizations/organizations.service.js';
export declare class AuthService {
    private readonly usersService;
    private readonly organizationService;
    constructor(usersService: UsersService, organizationService: OrganizationsService);
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
        organization: {
            id: string;
            name: string;
            slug: string;
            role: import("../membership/schemas/membership.schema.js").OrganizationRole;
        } | null;
    }>;
}
