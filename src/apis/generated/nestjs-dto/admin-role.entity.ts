import { ApiProperty } from '@nestjs/swagger';
import { AdminUsersRoles } from './admin-users-roles.entity';
import { AdminRolesPermissions } from './admin-roles-permissions.entity';

export class AdminRole {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: () => AdminUsersRoles,
    isArray: true,
    required: false,
  })
  users?: AdminUsersRoles[];
  @ApiProperty({
    type: () => AdminRolesPermissions,
    isArray: true,
    required: false,
  })
  permissions?: AdminRolesPermissions[];
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
