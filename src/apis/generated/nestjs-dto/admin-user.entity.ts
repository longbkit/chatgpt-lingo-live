import { UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from './session.entity';
import { Post } from './post.entity';
import { AuditLog } from './audit-log.entity';
import { AdminUsersRoles } from './admin-users-roles.entity';

export class AdminUser {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  username: string | null;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  password_hash: string;
  @ApiProperty({
    type: 'string',
  })
  first_name: string;
  @ApiProperty({
    type: 'string',
  })
  last_name: string;
  @ApiProperty({
    enum: UserStatus,
  })
  status: UserStatus;
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
    nullable: true,
  })
  created_by: string | null;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  created_by_user?: AdminUser | null;
  @ApiProperty({
    type: () => AdminUser,
    isArray: true,
    required: false,
  })
  created_users?: AdminUser[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updated_by: string | null;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  updated_by_user?: AdminUser | null;
  @ApiProperty({
    type: () => AdminUser,
    isArray: true,
    required: false,
  })
  updated_users?: AdminUser[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  deleted_at: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  deleted_by: string | null;
  @ApiProperty({
    type: () => AdminUser,
    required: false,
    nullable: true,
  })
  deleted_by_user?: AdminUser | null;
  @ApiProperty({
    type: () => AdminUser,
    isArray: true,
    required: false,
  })
  deleted_users?: AdminUser[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  last_login: Date | null;
  @ApiProperty({
    type: () => Session,
    isArray: true,
    required: false,
  })
  sessions?: Session[];
  @ApiProperty({
    type: () => Post,
    isArray: true,
    required: false,
  })
  created_posts?: Post[];
  @ApiProperty({
    type: () => Post,
    isArray: true,
    required: false,
  })
  updated_posts?: Post[];
  @ApiProperty({
    type: () => Post,
    isArray: true,
    required: false,
  })
  deleted_posts?: Post[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  two_factor_secret: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  is_two_factor_enabled: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  last_password_change: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  failed_login_attempts: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  locked_until: Date | null;
  @ApiProperty({
    type: () => AuditLog,
    isArray: true,
    required: false,
  })
  audit_logs?: AuditLog[];
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  otp: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  otp_expiry: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  otp_sent: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  verification_token: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  verification_token_expiry: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  verification_token_sent: Date | null;
  @ApiProperty({
    type: () => AdminUsersRoles,
    isArray: true,
    required: false,
  })
  roles?: AdminUsersRoles[];
}
