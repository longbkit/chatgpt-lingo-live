import { ApiProperty } from '@nestjs/swagger';

export class LearningProfileDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  day_streak: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_seen: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_studied: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_correct: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_incorrect: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_mature: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_young: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  words_new: number;
}
