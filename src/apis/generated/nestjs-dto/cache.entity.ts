import { ApiProperty } from '@nestjs/swagger';

export class Cache {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  key: string;
  @ApiProperty({
    type: 'string',
  })
  value: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  expires_at: Date;
}
