import { ApiProperty } from '@nestjs/swagger';
import { PostTranslation } from './post-translation.entity';
import { CommentTranslation } from './comment-translation.entity';

export class Language {
  @ApiProperty({
    type: 'string',
  })
  code: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'boolean',
  })
  isRtl: boolean;
  @ApiProperty({
    type: () => PostTranslation,
    isArray: true,
    required: false,
  })
  post_translations?: PostTranslation[];
  @ApiProperty({
    type: () => CommentTranslation,
    isArray: true,
    required: false,
  })
  comment_translations?: CommentTranslation[];
}
