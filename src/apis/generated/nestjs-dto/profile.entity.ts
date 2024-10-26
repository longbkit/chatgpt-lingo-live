import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { LearningProfile } from './learning-profile.entity';
import { CategoryProfile } from './category-profile.entity';
import { LearnedDictionary } from './learned-dictionary.entity';

export class Profile {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  user_id: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  first_name: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  last_name: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  bio: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  preferred_language: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatar_url: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  birthdate: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  country: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  website: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updated_at: Date;
  @ApiProperty({
    type: () => LearningProfile,
    required: false,
    nullable: true,
  })
  learning_profile?: LearningProfile | null;
  @ApiProperty({
    type: () => CategoryProfile,
    isArray: true,
    required: false,
  })
  category_profiles?: CategoryProfile[];
  @ApiProperty({
    type: () => LearnedDictionary,
    isArray: true,
    required: false,
  })
  learned_dictionaries?: LearnedDictionary[];
}
