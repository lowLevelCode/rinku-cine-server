import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';

@Controller('employee-type')
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) {}

  @Post()
  create(@Body() createEmployeeTypeDto: CreateEmployeeTypeDto) {
    return this.employeeTypeService.create(createEmployeeTypeDto);
  }

  @Get()
  findAll() {
    return this.employeeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeTypeDto: UpdateEmployeeTypeDto) {
    return this.employeeTypeService.update(+id, updateEmployeeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeTypeService.remove(+id);
  }
}
