import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AdminPermissionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  resource: string;
  @ApiProperty({
    type: 'string',
  })
  action: string;
  @ApiProperty({
    type: () => Object,
  })
  conditions: Prisma.JsonValue;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  fields: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  updated_at: Date | null;
  @ApiProperty({
    type: 'string',
  })
  created_by: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updated_by: string | null;
}
