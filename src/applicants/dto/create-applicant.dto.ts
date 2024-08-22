import { EmploymentStatus, MaritalStatus } from '../applicant-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicantDto {
  @ApiProperty({ description: 'Name of the applicant' })
  name: string;

  @ApiProperty({
    description: 'Employment status of the applicant',
    enum: EmploymentStatus,
  })
  employmentStatus: EmploymentStatus;

  @ApiProperty({
    description: 'Marital status of the applicant',
    enum: MaritalStatus,
  })
  maritalStatus: MaritalStatus;

  @ApiProperty({
    description: 'Sex of the applicant',
    enum: ['male', 'female'],
  })
  sex: string;

  @ApiProperty({
    description: 'Date of birth of the applicant',
    example: '1990-01-01',
  })
  dateOfBirth: Date;
}
