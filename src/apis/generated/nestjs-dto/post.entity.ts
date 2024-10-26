import { Prisma, ContentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from './admin-user.entity';
import { Comment } from './comment.entity';
import { PostTranslation } from './post-translation.entity';
import { PostsCategories } from './posts-categories.entity';
import { PostsTags } from './posts-tags.entity';

export class Post {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  slug: string;
  @ApiProperty({
    enum: ContentStatus,
  })
  status: ContentStatus;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  publish_date: Date | null;
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
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deleted_at: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  deleted_by_id: string | null;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  deleted_by_user?: AdminUser | null;
  @ApiProperty({
    type: () => Comment,
    isArray: true,
    required: false,
  })
  comments?: Comment[];
  @ApiProperty({
    type: () => PostTranslation,
    isArray: true,
    required: false,
  })
  translations?: PostTranslation[];
  @ApiProperty({
    type: () => PostsCategories,
    isArray: true,
    required: false,
  })
  categories?: PostsCategories[];
  @ApiProperty({
    type: () => PostsTags,
    isArray: true,
    required: false,
  })
  tags?: PostsTags[];
  @ApiProperty({
    type: 'string',
  })
  created_by_id: string;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
  })
  created_by?: AdminUser;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updated_by_id: string | null;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  updated_by?: AdminUser | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  view_count: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  featured_image: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  is_featured: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  allow_comments: boolean;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  revision_history: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  seo_score: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  reading_time: number | null;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  custom_fields: Prisma.JsonValue | null;
}
