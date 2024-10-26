import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from './dictionary.entity';
import { WordTag } from './word-tag.entity';

export class DictionaryTag {
  @ApiProperty({
    type: 'string',
  })
  dictionary_id: string;
  @ApiProperty({
    type: 'string',
  })
  tag_id: string;
  @ApiProperty({
    type: () => Dictionary,
    required: false,
  })
  dictionary?: Dictionary;
  @ApiProperty({
    type: () => WordTag,
    required: false,
  })
  tag?: WordTag;
}
