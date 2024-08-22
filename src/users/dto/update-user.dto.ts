import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'The username of the user' })
  username?: string;

  @ApiPropertyOptional({ description: 'The password of the user' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the user has admin privileges',
  })
  isAdmin?: boolean;
}
