import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @Matches(/\S/, { message: 'name must not be blank' })
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(63)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must contain lowercase letters, numbers, and single hyphens between segments',
  })
  slug!: string;
}