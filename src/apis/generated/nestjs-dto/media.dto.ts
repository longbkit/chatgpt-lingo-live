import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MediaDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  filename: string;
  @ApiProperty({
    type: 'string',
  })
  path: string;
  @ApiProperty({
    type: 'string',
  })
  mime_type: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  size: number;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  alt_text: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
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
    nullable: true,
  })
  width: number | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  height: number | null;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  metadata: Prisma.JsonValue | null;
}
