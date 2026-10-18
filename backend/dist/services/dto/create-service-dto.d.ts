export declare class CreateServiceDto {
    teamId: string;
    name: string;
    description?: string;
    kind: 'api' | 'worker' | 'web-app' | 'library';
}
