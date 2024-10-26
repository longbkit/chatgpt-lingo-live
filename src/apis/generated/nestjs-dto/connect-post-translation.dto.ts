import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PostTranslationPostIdLanguageCodeUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  post_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  language_code: string;
}

@ApiExtraModels(PostTranslationPostIdLanguageCodeUniqueInputDto)
export class ConnectPostTranslationDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: PostTranslationPostIdLanguageCodeUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PostTranslationPostIdLanguageCodeUniqueInputDto)
  post_id_language_code?: PostTranslationPostIdLanguageCodeUniqueInputDto;
}
