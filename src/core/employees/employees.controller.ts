import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post('createMany')
  createMany(@Body() createEmployeeDtos: CreateEmployeeDto[]) {
    return this.employeesService.createMany(createEmployeeDtos);
  }  

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.employeesService.findByPagination({page,limit});
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
