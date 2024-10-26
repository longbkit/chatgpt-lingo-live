import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DictionaryLinkLinkFromIdLinkToIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  link_from_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  link_to_id: string;
}

@ApiExtraModels(DictionaryLinkLinkFromIdLinkToIdUniqueInputDto)
export class ConnectDictionaryLinkDto {
  @ApiProperty({
    type: DictionaryLinkLinkFromIdLinkToIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DictionaryLinkLinkFromIdLinkToIdUniqueInputDto)
  link_from_id_link_to_id: DictionaryLinkLinkFromIdLinkToIdUniqueInputDto;
}
