import { ApiProperty } from '@nestjs/swagger';
import { DictionaryTag } from './dictionary-tag.entity';

export class WordTag {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: () => DictionaryTag,
    isArray: true,
    required: false,
  })
  dictionaries?: DictionaryTag[];
}
