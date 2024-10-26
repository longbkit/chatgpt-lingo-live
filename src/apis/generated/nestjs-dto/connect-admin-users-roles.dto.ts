import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUsersRolesUserIdRoleIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
    default: 'uuid(4)',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;
  @ApiProperty({
    type: 'string',
    default: 'uuid(4)',
  })
  @IsNotEmpty()
  @IsString()
  role_id: string;
}

@ApiExtraModels(AdminUsersRolesUserIdRoleIdUniqueInputDto)
export class ConnectAdminUsersRolesDto {
  @ApiProperty({
    type: AdminUsersRolesUserIdRoleIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminUsersRolesUserIdRoleIdUniqueInputDto)
  user_id_role_id: AdminUsersRolesUserIdRoleIdUniqueInputDto;
}
