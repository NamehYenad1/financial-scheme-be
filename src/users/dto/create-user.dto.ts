import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({
    description: 'Indicates if the user has admin privileges',
    required: false,
  })
  isAdmin?: boolean;
}
