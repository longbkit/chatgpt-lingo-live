import { ApiProperty } from '@nestjs/swagger';
import { Dictionary } from './dictionary.entity';
import { WordCategory } from './word-category.entity';

export class DictionaryCategory {
  @ApiProperty({
    type: 'string',
  })
  dictionary_id: string;
  @ApiProperty({
    type: 'string',
  })
  category_id: string;
  @ApiProperty({
    type: () => Dictionary,
    required: false,
  })
  dictionary?: Dictionary;
  @ApiProperty({
    type: () => WordCategory,
    required: false,
  })
  category?: WordCategory;
}
