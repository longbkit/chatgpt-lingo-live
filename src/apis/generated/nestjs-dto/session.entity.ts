import { ApiProperty } from '@nestjs/swagger';
import { AdminUser } from './admin-user.entity';
import { User } from './user.entity';

export class Session {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  admin_user_id: string | null;
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
  user_id: string | null;
  @ApiProperty({
    type: () => User,
    required: false,
    nullable: true,
  })
  user?: User | null;
  @ApiProperty({
    type: 'string',
  })
  token: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  expires_at: Date;
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
    type: 'string',
    format: 'date-time',
  })
  updated_at: Date;
}
