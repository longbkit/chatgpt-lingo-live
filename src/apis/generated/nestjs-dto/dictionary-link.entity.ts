import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from './dictionary.entity';

export class DictionaryLink {
  @ApiProperty({
    type: 'string',
  })
  link_from_id: string;
  @ApiProperty({
    type: 'string',
  })
  link_to_id: string;
  @ApiProperty({
    type: 'string',
  })
  type: string;
  @ApiProperty({
    type: () => Dictionary,
    required: false,
  })
  link_from?: Dictionary;
  @ApiProperty({
    type: () => Dictionary,
    required: false,
  })
  link_to?: Dictionary;
}
