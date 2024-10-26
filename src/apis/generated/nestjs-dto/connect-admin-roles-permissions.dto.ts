import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminRolesPermissionsRoleIdPermissionIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
    default: 'uuid(4)',
  })
  @IsNotEmpty()
  @IsString()
  role_id: string;
  @ApiProperty({
    type: 'string',
    default: 'uuid(4)',
  })
  @IsNotEmpty()
  @IsString()
  permission_id: string;
}

@ApiExtraModels(AdminRolesPermissionsRoleIdPermissionIdUniqueInputDto)
export class ConnectAdminRolesPermissionsDto {
  @ApiProperty({
    type: AdminRolesPermissionsRoleIdPermissionIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminRolesPermissionsRoleIdPermissionIdUniqueInputDto)
  role_id_permission_id: AdminRolesPermissionsRoleIdPermissionIdUniqueInputDto;
}
