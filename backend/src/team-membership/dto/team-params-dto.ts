import{
    IsMongoId
} from 'class-validator'


export class TeamParamsDto{
    @IsMongoId()
    teamId!:string;
}