import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/user-role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('applicants')
@ApiBearerAuth()
@Controller('applicants')
@UseGuards(JwtAuthGuard) // Apply JWT Auth Guard to all routes
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  findAll() {
    return this.applicantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicantsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard) // Apply RolesGuard to this route
  @Roles(UserRole.Admin) // Restrict access to Admins only
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantsService.create(createApplicantDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard) // Apply RolesGuard to this route
  @Roles(UserRole.Admin) // Restrict access to Admins only
  update(
    @Param('id') id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ) {
    return this.applicantsService.update(id, updateApplicantDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard) // Apply RolesGuard to this route
  @Roles(UserRole.Admin) // Restrict access to Admins only
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.applicantsService.remove(id);
  }
}
