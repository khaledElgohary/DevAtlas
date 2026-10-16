import{
    IsMongoId,
    IsString,
    Matches,
    MaxLength,
} from 'class-validator';

export class CreateTeamDto{
    @IsMongoId()
    organizationId!: string;

    @IsString()
    @MaxLength(100)
    @Matches(/\S/, { message: 'name must not be blank' })
    name!: string;
}