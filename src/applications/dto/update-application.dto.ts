import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationDto {
  @ApiPropertyOptional({
    description: 'The status of the application',
    enum: ['Pending', 'Approved', 'Rejected'],
  })
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status?: 'Pending' | 'Approved' | 'Rejected';

  @ApiPropertyOptional({ description: 'Remarks for the application' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
