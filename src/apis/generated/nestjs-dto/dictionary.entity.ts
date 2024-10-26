import { ApiProperty } from '@nestjs/swagger';
import { DictionaryCategory } from './dictionary-category.entity';
import { DictionaryTag } from './dictionary-tag.entity';
import { DictionaryLink } from './dictionary-link.entity';
import { LearnedDictionary } from './learned-dictionary.entity';

export class Dictionary {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  text: string;
  @ApiProperty({
    type: 'string',
  })
  pinyin: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  traditional_chinese: string | null;
  @ApiProperty({
    type: 'string',
  })
  definition: string;
  @ApiProperty({
    type: 'string',
  })
  type: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  image: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  audio: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  video: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  updated_at: Date | null;
  @ApiProperty({
    type: () => DictionaryCategory,
    isArray: true,
    required: false,
  })
  categories?: DictionaryCategory[];
  @ApiProperty({
    type: () => DictionaryTag,
    isArray: true,
    required: false,
  })
  tags?: DictionaryTag[];
  @ApiProperty({
    type: () => DictionaryLink,
    isArray: true,
    required: false,
  })
  links_from?: DictionaryLink[];
  @ApiProperty({
    type: () => DictionaryLink,
    isArray: true,
    required: false,
  })
  links_to?: DictionaryLink[];
  @ApiProperty({
    type: () => LearnedDictionary,
    isArray: true,
    required: false,
  })
  learned_dictionaries?: LearnedDictionary[];
}
