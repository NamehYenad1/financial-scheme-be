import { EmploymentStatus, MaritalStatus } from '../applicant-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicantDto {
  @ApiPropertyOptional({ description: 'Name of the applicant' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Employment status of the applicant',
    enum: EmploymentStatus,
  })
  employmentStatus?: EmploymentStatus;

  @ApiPropertyOptional({
    description: 'Marital status of the applicant',
    enum: MaritalStatus,
  })
  maritalStatus?: MaritalStatus;

  @ApiPropertyOptional({
    description: 'Sex of the applicant',
    enum: ['male', 'female'],
  })
  sex?: string;

  @ApiPropertyOptional({
    description: 'Date of birth of the applicant',
    example: '1990-01-01',
  })
  dateOfBirth?: Date;
}
