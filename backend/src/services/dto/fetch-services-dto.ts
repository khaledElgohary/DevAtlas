import{
    IsMongoId
} from "class-validator"


export class FetchServicesDto{
    @IsMongoId()
    teamId: string;
}