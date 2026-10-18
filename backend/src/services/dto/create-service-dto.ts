import{
    IsMongoId,
    IsString,
    Matches,
    MaxLength,
    ValidateIf,
    IsIn,

} from 'class-validator';

export class CreateServiceDto {
    @IsMongoId()
    teamId!:string;

    @IsString()
    @Matches(/\S/, { message: 'Name cannot be empty or just spaces' })
    @MaxLength(100)
    name!:string;

    @IsString()
    @MaxLength(1000)
    @ValidateIf((o) => o.description !== undefined)
    description?:string;

    @IsString()
    @IsIn(['api', 'worker', 'web-app', 'library'])
    kind!: 'api' | 'worker' | 'web-app' | 'library';
    
}