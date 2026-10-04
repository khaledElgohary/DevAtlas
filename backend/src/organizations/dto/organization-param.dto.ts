import { IsMongoId } from 'class-validator';

export class OrganizationParamsDto {
  @IsMongoId()
  organizationId!: string;
}