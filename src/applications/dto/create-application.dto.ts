import { IsUUID, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'The ID of the applicant' })
  @IsUUID()
  applicantId: string;

  @ApiProperty({ description: 'The ID of the scheme' })
  @IsUUID()
  schemeId: string;

  @ApiProperty({
    description: 'The date of application',
    example: '2024-08-22',
  })
  @IsDateString()
  applicationDate: string;

  @ApiProperty({
    description: 'The status of the application',
    enum: ['Pending', 'Approved', 'Rejected'],
  })
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status: 'Pending' | 'Approved' | 'Rejected';

  @ApiProperty({ description: 'Remarks for the application', required: false })
  @IsString()
  remarks?: string;
}
