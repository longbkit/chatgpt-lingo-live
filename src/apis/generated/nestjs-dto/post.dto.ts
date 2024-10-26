import { Prisma, ContentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
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
