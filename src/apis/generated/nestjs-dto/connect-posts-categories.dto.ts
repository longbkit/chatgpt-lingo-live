import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PostsCategoriesPostIdCategoryIdUniqueInputDto {
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
  category_id: string;
}

@ApiExtraModels(PostsCategoriesPostIdCategoryIdUniqueInputDto)
export class ConnectPostsCategoriesDto {
  @ApiProperty({
    type: PostsCategoriesPostIdCategoryIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostsCategoriesPostIdCategoryIdUniqueInputDto)
  post_id_category_id: PostsCategoriesPostIdCategoryIdUniqueInputDto;
}
