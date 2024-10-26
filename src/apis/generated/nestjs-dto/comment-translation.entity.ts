import { ApiProperty } from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { Language } from './language.entity';

export class CommentTranslation {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  comment_id: string;
  @ApiProperty({
    type: () => Comment,
    required: false,
  })
  comment?: Comment;
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
  content: string;
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
