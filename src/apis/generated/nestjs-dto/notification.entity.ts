import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class Notification {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  user_id: string;
  @ApiProperty({
    type: () => User,
    required: false,
  })
  user?: User;
  @ApiProperty({
    type: 'string',
  })
  type: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'boolean',
  })
  is_read: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
}
