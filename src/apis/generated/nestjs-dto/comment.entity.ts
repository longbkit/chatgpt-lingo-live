import { ContentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';
import { CommentTranslation } from './comment-translation.entity';

export class Comment {
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
    enum: ContentStatus,
  })
  status: ContentStatus;
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
    type: () => CommentTranslation,
    isArray: true,
    required: false,
  })
  translations?: CommentTranslation[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  parent_id: string | null;
  @ApiProperty({
    type: () => Comment,
    required: false,
    nullable: true,
  })
  parent?: Comment | null;
  @ApiProperty({
    type: () => Comment,
    isArray: true,
    required: false,
  })
  replies?: Comment[];
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  likes_count: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  reports_count: number;
}
