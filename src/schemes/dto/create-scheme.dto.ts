import { IsString, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MaritalStatus,
  EmploymentStatus,
} from '../../applicants/applicant-status.enum';

export class CreateSchemeDto {
  @ApiProperty({ description: 'Name of the scheme' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the scheme' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Eligible marital statuses',
    enum: MaritalStatus,
    isArray: true,
  })
  @IsArray()
  eligibleMaritalStatuses: MaritalStatus[];

  @ApiProperty({
    description: 'Eligible employment statuses',
    enum: EmploymentStatus,
    isArray: true,
  })
  @IsArray()
  eligibleEmploymentStatuses: EmploymentStatus[];

  @ApiProperty({
    description: 'Indicates if the scheme requires school children',
  })
  @IsBoolean()
  requiresSchoolChildren: boolean;
}
