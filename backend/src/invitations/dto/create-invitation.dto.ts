import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateInvitationDto {
  @IsMongoId()
  organizationId!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsIn(['admin', 'member'])
  role!: 'admin' | 'member';
}