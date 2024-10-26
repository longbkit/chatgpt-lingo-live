import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRolesPermissions } from './admin-roles-permissions.entity';

export class AdminPermission {
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
    type: () => AdminRolesPermissions,
    isArray: true,
    required: false,
  })
  roles?: AdminRolesPermissions[];
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
