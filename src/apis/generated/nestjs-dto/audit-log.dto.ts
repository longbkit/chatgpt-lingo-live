import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuditLogDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  user_id: string;
  @ApiProperty({
    type: 'string',
  })
  user_type: string;
  @ApiProperty({
    type: 'string',
  })
  action: string;
  @ApiProperty({
    type: 'string',
  })
  entity_type: string;
  @ApiProperty({
    type: 'string',
  })
  entity_id: string;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  details: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  ip_address: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  user_agent: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
}
