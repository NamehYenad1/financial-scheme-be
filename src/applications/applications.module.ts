import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { Scheme } from '../schemes/entities/scheme.entity';
import { Applicant } from 'src/applicants/entities/applicant.entity';
import { ApplicantsModule } from '../applicants/applicants.modules';
import { SchemesModule } from '../schemes/schemes.module';
import { SchemesService } from '../schemes/schemes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Applicant, Scheme]),
    ApplicantsModule,
    SchemesModule,
  ],
  providers: [ApplicationsService, SchemesService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
