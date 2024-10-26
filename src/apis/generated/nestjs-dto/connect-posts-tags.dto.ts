import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PostsTagsPostIdTagIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  post_id: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  tag_id: string;
}

@ApiExtraModels(PostsTagsPostIdTagIdUniqueInputDto)
export class ConnectPostsTagsDto {
  @ApiProperty({
    type: PostsTagsPostIdTagIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostsTagsPostIdTagIdUniqueInputDto)
  post_id_tag_id: PostsTagsPostIdTagIdUniqueInputDto;
}
