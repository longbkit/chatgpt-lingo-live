import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';
import { Language } from './language.entity';

export class PostTranslation {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  post_id: string;
  @ApiProperty({
    type: () => Post,
    required: false,
  })
  post?: Post;
  @ApiProperty({
    type: 'string',
  })
  language_code: string;
  @ApiProperty({
    type: () => Language,
    required: false,
  })
  language?: Language;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  excerpt: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  meta_title: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  meta_description: string | null;
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
}
