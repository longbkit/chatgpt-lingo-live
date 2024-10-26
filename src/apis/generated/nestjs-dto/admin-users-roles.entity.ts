import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from './admin-user.entity';
import { AdminRole } from './admin-role.entity';

export class AdminUsersRoles {
  @ApiProperty({
    type: () => AdminUser,
    required: false,
  })
  user?: AdminUser;
  @ApiProperty({
    type: 'string',
  })
  user_id: string;
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
