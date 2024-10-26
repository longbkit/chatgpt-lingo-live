import { ApiProperty } from '@nestjs/swagger';

export class DictionaryDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  text: string;
  @ApiProperty({
    type: 'string',
  })
  pinyin: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  traditional_chinese: string | null;
  @ApiProperty({
    type: 'string',
  })
  definition: string;
  @ApiProperty({
    type: 'string',
  })
  type: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  image: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  audio: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  video: string | null;
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
}
