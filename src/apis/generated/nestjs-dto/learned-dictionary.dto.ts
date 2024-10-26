import { ApiProperty } from '@nestjs/swagger';

export class LearnedDictionaryDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  status: string;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  ease_factor: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  interval: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  next_review: Date | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  seen_count: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  review_count: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  last_reviewed: Date | null;
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
