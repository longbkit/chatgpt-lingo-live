import { UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AdminUserDto {
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
    format: 'date-time',
    nullable: true,
  })
  deleted_at: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  last_login: Date | null;
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
}
