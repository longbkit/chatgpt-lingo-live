import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DictionaryCategoryDictionaryIdCategoryIdUniqueInputDto {
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
  category_id: string;
}

@ApiExtraModels(DictionaryCategoryDictionaryIdCategoryIdUniqueInputDto)
export class ConnectDictionaryCategoryDto {
  @ApiProperty({
    type: DictionaryCategoryDictionaryIdCategoryIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DictionaryCategoryDictionaryIdCategoryIdUniqueInputDto)
  dictionary_id_category_id: DictionaryCategoryDictionaryIdCategoryIdUniqueInputDto;
}
