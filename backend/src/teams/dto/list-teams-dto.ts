import{
    IsMongoId
} from 'class-validator';

export class ListTeamsQueryDto{
    @IsMongoId()
    organizationId!: string;
}