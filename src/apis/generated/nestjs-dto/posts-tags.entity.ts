import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

export class PostsTags {
  @ApiProperty({
    type: 'string',
  })
  post_id: string;
  @ApiProperty({
    type: 'string',
  })
  tag_id: string;
  @ApiProperty({
    type: () => Post,
    required: false,
  })
  post?: Post;
  @ApiProperty({
    type: () => Tag,
    required: false,
  })
  tag?: Tag;
}
