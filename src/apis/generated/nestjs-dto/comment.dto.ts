import { ContentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
