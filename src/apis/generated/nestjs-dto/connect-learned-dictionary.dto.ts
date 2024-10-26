import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LearnedDictionaryProfileIdDictionaryIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  profile_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  dictionary_id: string;
}

@ApiExtraModels(LearnedDictionaryProfileIdDictionaryIdUniqueInputDto)
export class ConnectLearnedDictionaryDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: LearnedDictionaryProfileIdDictionaryIdUniqueInputDto,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LearnedDictionaryProfileIdDictionaryIdUniqueInputDto)
  profile_id_dictionary_id?: LearnedDictionaryProfileIdDictionaryIdUniqueInputDto;
}
