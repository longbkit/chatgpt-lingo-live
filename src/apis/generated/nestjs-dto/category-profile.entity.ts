import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { WordCategory } from './word-category.entity';

export class CategoryProfile {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  profile_id: string;
  @ApiProperty({
    type: () => Profile,
    required: false,
  })
  profile?: Profile;
  @ApiProperty({
    type: 'string',
  })
  category_id: string;
  @ApiProperty({
    type: () => WordCategory,
    required: false,
  })
  category?: WordCategory;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_seen: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_studied: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_correct: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_incorrect: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_mature: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_young: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_new: number;
}
