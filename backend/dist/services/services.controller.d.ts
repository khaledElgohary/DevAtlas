import { ServicesService } from './services.service.js';
import { FetchServicesDto } from './dto/fetch-services-dto.js';
import type { Request } from 'express';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    listServices(params: FetchServicesDto, req: Request): Promise<{
        id: string;
        name: string;
        kind: "api" | "worker" | "web-app" | "library";
        teamId: string;
        organizationId: string;
        description: string;
    }[]>;
}
