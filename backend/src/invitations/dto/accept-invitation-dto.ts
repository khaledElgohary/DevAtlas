import { IsHexadecimal, IsString, Length } from 'class-validator';

export class AcceptInvitationDto {
  @IsString()
  @IsHexadecimal()
  @Length(64, 64)
  token!: string;
}