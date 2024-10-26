import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CommentTranslationCommentIdLanguageCodeUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  comment_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  language_code: string;
}

@ApiExtraModels(CommentTranslationCommentIdLanguageCodeUniqueInputDto)
export class ConnectCommentTranslationDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: CommentTranslationCommentIdLanguageCodeUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CommentTranslationCommentIdLanguageCodeUniqueInputDto)
  comment_id_language_code?: CommentTranslationCommentIdLanguageCodeUniqueInputDto;
}
