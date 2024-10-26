import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DictionaryTagDictionaryIdTagIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  dictionary_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  tag_id: string;
}

@ApiExtraModels(DictionaryTagDictionaryIdTagIdUniqueInputDto)
export class ConnectDictionaryTagDto {
  @ApiProperty({
    type: DictionaryTagDictionaryIdTagIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DictionaryTagDictionaryIdTagIdUniqueInputDto)
  dictionary_id_tag_id: DictionaryTagDictionaryIdTagIdUniqueInputDto;
}
