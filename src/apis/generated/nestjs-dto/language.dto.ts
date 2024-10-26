import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  @ApiProperty({
    type: 'string',
  })
  code: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'boolean',
  })
  isRtl: boolean;
}
