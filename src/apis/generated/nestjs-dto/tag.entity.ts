import { ApiProperty } from '@nestjs/swagger';
import { PostsTags } from './posts-tags.entity';

export class Tag {
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
  slug: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: () => PostsTags,
    isArray: true,
    required: false,
  })
  posts?: PostsTags[];
}
