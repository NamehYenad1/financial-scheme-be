import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { Applicant } from './entities/applicant.entity';
import { HouseholdMember } from './entities/household-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant, HouseholdMember])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
  exports: [ApplicantsService],
})
export class ApplicantsModule {}
