import { ApiProperty } from '@nestjs/swagger';

export class ApiTokenDto {
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
  })
  token: string;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  scope: string[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  expires_at: Date | null;
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
  last_used: Date | null;
}
