import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from './admin-role.entity';
import { AdminPermission } from './admin-permission.entity';

export class AdminRolesPermissions {
  @ApiProperty({
    type: () => AdminRole,
    required: false,
  })
  role?: AdminRole;
  @ApiProperty({
    type: 'string',
  })
  role_id: string;
  @ApiProperty({
    type: () => AdminPermission,
    required: false,
  })
  permission?: AdminPermission;
  @ApiProperty({
    type: 'string',
  })
  permission_id: string;
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
