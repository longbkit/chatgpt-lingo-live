import { UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
    nullable: true,
  })
  reset_password_token: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  reset_token_expires: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  provider: string | null;
  @ApiProperty({
    enum: UserStatus,
  })
  status: UserStatus;
  @ApiProperty({
    type: 'boolean',
  })
  email_verified: boolean;
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
  verification_token: string | null;
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
}
