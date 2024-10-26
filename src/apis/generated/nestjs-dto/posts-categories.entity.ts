import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.entity';
import { Category } from './category.entity';

export class PostsCategories {
  @ApiProperty({
    type: 'string',
  })
  post_id: string;
  @ApiProperty({
    type: 'string',
  })
  category_id: string;
  @ApiProperty({
    type: () => Post,
    required: false,
  })
  post?: Post;
  @ApiProperty({
    type: () => Category,
    required: false,
  })
  category?: Category;
}
