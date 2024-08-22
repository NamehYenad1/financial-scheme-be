import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemesService } from './schemes.service';
import { SchemesController } from './schemes.controller';
import { Scheme } from './entities/scheme.entity';
import { Benefit } from './entities/benefit.entity';
import { Application } from '../applications/entities/application.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Scheme, Benefit, Application])],
  providers: [SchemesService],
  controllers: [SchemesController],
  exports: [SchemesService],
})
export class SchemesModule {}
