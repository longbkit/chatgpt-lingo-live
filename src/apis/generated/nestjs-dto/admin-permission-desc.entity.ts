import { ApiProperty } from '@nestjs/swagger';

export class AdminPermissionDesc {
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
  description: string;
  @ApiProperty({
    type: () => AdminPermissionDesc,
    required: false,
    nullable: true,
  })
  parent?: AdminPermissionDesc | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  parent_id: string | null;
  @ApiProperty({
    type: () => AdminPermissionDesc,
    isArray: true,
    required: false,
  })
  childs?: AdminPermissionDesc[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  created_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  updated_at: Date | null;
  @ApiProperty({
    type: 'string',
  })
  created_by: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updated_by: string | null;
}
