import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from './admin-user.entity';

export class AuditLog {
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
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  admin_user?: AdminUser | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  admin_user_id: string | null;
}
