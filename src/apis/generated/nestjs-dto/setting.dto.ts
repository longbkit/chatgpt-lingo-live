import { SettingType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {
  @ApiProperty({
    type: 'string',
  })
  key: string;
  @ApiProperty({
    type: 'string',
  })
  value: string;
  @ApiProperty({
    enum: SettingType,
  })
  type: SettingType;
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
    nullable: true,
  })
  created_by: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updated_by: string | null;
}
