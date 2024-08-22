import { PartialType } from '@nestjs/mapped-types';
import { CreateSchemeDto } from './create-scheme.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  MaritalStatus,
  EmploymentStatus,
} from 'src/applicants/applicant-status.enum';

export class UpdateSchemeDto extends PartialType(CreateSchemeDto) {
  @ApiPropertyOptional({ description: 'Name of the scheme' })
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the scheme' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Eligible marital statuses',
    enum: MaritalStatus,
    isArray: true,
  })
  eligibleMaritalStatuses?: MaritalStatus[];

  @ApiPropertyOptional({
    description: 'Eligible employment statuses',
    enum: EmploymentStatus,
    isArray: true,
  })
  eligibleEmploymentStatuses?: EmploymentStatus[];

  @ApiPropertyOptional({
    description: 'Indicates if the scheme requires school children',
  })
  requiresSchoolChildren?: boolean;
}
