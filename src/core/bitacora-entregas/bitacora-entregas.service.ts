import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeRepository } from '../employees/entities/employee.repository';
import { CreateBitacoraEntregasDto } from './dto/create-bitacora-entregas.dto';
import { UpdateBitacoraEntregasDto } from './dto/update-bitacora-entregas.dto';
import { BitacoraEntregas, BitacoraEntregasRepository } from './entities/bitacora-entregas.entity';
import { uuid } from 'uuidv4';
import { IPaginationMeta, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class BitacoraEntregasService {

  constructor(
    private readonly _bitacoraEntregasRepository: BitacoraEntregasRepository,
    private readonly _employeeRepository: EmployeeRepository){}

  async create(createBitacoraEntregasDto: CreateBitacoraEntregasDto) {

    const idEmployee = createBitacoraEntregasDto.idEmployee;
    const fechaCaptura = createBitacoraEntregasDto.fechaCaptura;
    const employee:Employee = idEmployee ? 
    await this._employeeRepository.findOne(idEmployee) : null;

    if(!employee) {
      throw new NotFoundException(`No existe ningun empleado con el id: ${idEmployee}`);
    }  

    const bitacoraDateExist = await this._bitacoraEntregasRepository.createQueryBuilder('b')
    .leftJoin("b.empleados","empleados")
    .where("empleados.id = :id", { id: idEmployee })
    .andWhere("b.fechaCaptura = :fecha", { fecha: fechaCaptura })
    .getOne();    

    if(bitacoraDateExist)
      throw new InternalServerErrorException(`Ya existe un registro con esa fecha y id`);

    let bitacora = new BitacoraEntregas();
    delete createBitacoraEntregasDto.idEmployee;
    Object.assign(bitacora,createBitacoraEntregasDto);

    bitacora.empleados = [employee];
    bitacora.folio = uuid();  // generamos un numero de folio unico

    return this._bitacoraEntregasRepository.save(bitacora);
  }

  findAll(paginationOptions:IPaginationOptions):Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {
    return this._bitacoraEntregasRepository.findAllPagination(paginationOptions);
  }

  findAllByEmployeeId(idEmployee:number, paginationOptions:IPaginationOptions):Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {
    return this._bitacoraEntregasRepository.findAllByEmployeeId(idEmployee, paginationOptions);
  }

  findOne(id: number) {
    return this._bitacoraEntregasRepository.findOne(id);
  }

  async update(id: number, updateBitacoraEntregasDto: UpdateBitacoraEntregasDto) {
    const employeeRolExist = await this.findOne(id);   
    return this._bitacoraEntregasRepository.save({
      ...employeeRolExist,
      ...updateBitacoraEntregasDto
    });
  }

  remove(id: number) {
    return this._bitacoraEntregasRepository.delete(id);
  }
}
