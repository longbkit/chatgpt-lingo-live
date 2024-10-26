import { UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ApiToken } from './api-token.entity';
import { Session } from './session.entity';
import { Media } from './media.entity';
import { Profile } from './profile.entity';
import { Notification } from './notification.entity';

export class User {
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
    type: () => ApiToken,
    isArray: true,
    required: false,
  })
  api_tokens?: ApiToken[];
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
  @ApiProperty({
    type: () => Session,
    isArray: true,
    required: false,
  })
  sessions?: Session[];
  @ApiProperty({
    type: () => Media,
    isArray: true,
    required: false,
  })
  media?: Media[];
  @ApiProperty({
    type: () => Profile,
    required: false,
    nullable: true,
  })
  profile?: Profile | null;
  @ApiProperty({
    type: () => Notification,
    isArray: true,
    required: false,
  })
  notification?: Notification[];
}
