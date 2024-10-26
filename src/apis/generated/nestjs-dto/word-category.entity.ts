import { ApiProperty } from '@nestjs/swagger';
import { DictionaryCategory } from './dictionary-category.entity';
import { CategoryProfile } from './category-profile.entity';

export class WordCategory {
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
    type: () => DictionaryCategory,
    isArray: true,
    required: false,
  })
  dictionaries?: DictionaryCategory[];
  @ApiProperty({
    type: () => CategoryProfile,
    isArray: true,
    required: false,
  })
  learning_profiles?: CategoryProfile[];
}
