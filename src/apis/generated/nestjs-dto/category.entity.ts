import { ApiProperty } from '@nestjs/swagger';
import { PostsCategories } from './posts-categories.entity';

export class Category {
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
    type: 'string',
    nullable: true,
  })
  parent_id: string | null;
  @ApiProperty({
    type: () => Category,
    required: false,
    nullable: true,
  })
  parent?: Category | null;
  @ApiProperty({
    type: () => Category,
    isArray: true,
    required: false,
  })
  children?: Category[];
  @ApiProperty({
    type: () => PostsCategories,
    isArray: true,
    required: false,
  })
  posts?: PostsCategories[];
  @ApiProperty({
    type: 'boolean',
  })
  is_active: boolean;
}
