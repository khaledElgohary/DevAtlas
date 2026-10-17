import{
    IsMongoId
} from 'class-validator';

export class AddTeamMemberDto{
    @IsMongoId()
    teamId!: string;

    @IsMongoId()
    userId!: string;
}