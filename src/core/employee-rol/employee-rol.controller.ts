import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeRolService } from './employee-rol.service';
import { CreateEmployeeRolDto } from './dto/create-employee-rol.dto';
import { UpdateEmployeeRolDto } from './dto/update-employee-rol.dto';

@Controller('employee-rol')
export class EmployeeRolController {
  constructor(private readonly employeeRolService: EmployeeRolService) {}

  @Post()
  create(@Body() createEmployeeRolDto: CreateEmployeeRolDto) {
    return this.employeeRolService.create(createEmployeeRolDto);
  }

  @Get()
  findAll() {
    return this.employeeRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeRolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeRolDto: UpdateEmployeeRolDto) {
    return this.employeeRolService.update(+id, updateEmployeeRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeRolService.remove(+id);
  }
}
