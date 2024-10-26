import { ApiProperty } from '@nestjs/swagger';

export class DictionaryLinkDto {
  @ApiProperty({
    type: 'string',
  })
  type: string;
}
