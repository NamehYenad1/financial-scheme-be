import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SchemesService } from './schemes.service';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/user-role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('schemes')
@ApiBearerAuth()
@Controller('schemes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchemesController {
  constructor(private readonly schemesService: SchemesService) {}

  @Get()
  @Roles(UserRole.Admin)
  findAll() {
    return this.schemesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin)
  findOne(@Param('id') id: string) {
    return this.schemesService.findOne(id);
  }

  @Post()
  @Roles(UserRole.Admin)
  create(@Body() createSchemeDto: CreateSchemeDto) {
    return this.schemesService.create(createSchemeDto);
  }

  @Put(':id')
  @Roles(UserRole.Admin)
  update(@Param('id') id: string, @Body() updateSchemeDto: UpdateSchemeDto) {
    return this.schemesService.update(id, updateSchemeDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.schemesService.remove(id);
  }
}
