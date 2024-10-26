import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
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
