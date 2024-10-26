import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobQueueDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  payload: Prisma.InputJsonValue;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
