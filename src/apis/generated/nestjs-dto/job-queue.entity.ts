import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class JobQueue {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  type: string;
  @ApiProperty({
    type: () => Object,
  })
  payload: Prisma.JsonValue;
  @ApiProperty({
    type: 'string',
  })
  status: string;
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
