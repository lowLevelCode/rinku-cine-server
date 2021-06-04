import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeRepository } from '../employees/entities/employee.repository';
import { CreateBitacoraEntregasDto } from './dto/create-bitacora-entregas.dto';
import { UpdateBitacoraEntregasDto } from './dto/update-bitacora-entregas.dto';
import { BitacoraEntregas, BitacoraEntregasRepository } from './entities/bitacora-entregas.entity';
import { uuid } from 'uuidv4';
import { IPaginationMeta, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { EmployeeRolEnum } from 'src/enums/employee-rol.enum';

@Injectable()
export class BitacoraEntregasService {

  constructor(
    private readonly _bitacoraEntregasRepository: BitacoraEntregasRepository){}

  async create(createBitacoraEntregasDto: CreateBitacoraEntregasDto) {

    const idEmployee = createBitacoraEntregasDto.idEmployee;
    const fechaCaptura = createBitacoraEntregasDto.fechaCaptura;

    const idRol = createBitacoraEntregasDto.rolId;
    const cubrioTurno = createBitacoraEntregasDto.cubrioTurnoTo;
    

    if(idRol != EmployeeRolEnum.AUXILIAR && cubrioTurno){
      throw new BadRequestException("Solo los auxiliares pueden cubir turno");
    }

    const bitacoraDateExist = await this._bitacoraEntregasRepository.createQueryBuilder('b')
    .leftJoin("b.empleados","empleados")
    .where("empleados.id = :id", { id: idEmployee })
    .andWhere("b.fechaCaptura = :fecha", { fecha: fechaCaptura })
    .getOne();    

    if(bitacoraDateExist)
      throw new InternalServerErrorException(`Ya existe un registro con esa fecha y id`);
    
    createBitacoraEntregasDto.folio = uuid();  // generamos un numero de folio unico

    return this._bitacoraEntregasRepository.save(createBitacoraEntregasDto);
  }

  findAll(paginationOptions:IPaginationOptions):Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {
    return this._bitacoraEntregasRepository.findAllPagination(paginationOptions);
  }

  findAllByEmployeeId(idEmployee:number, paginationOptions:IPaginationOptions):Promise<Pagination<BitacoraEntregas,IPaginationMeta>> {
    return this._bitacoraEntregasRepository.findAllByEmployeeId(idEmployee, paginationOptions);
  }

  findAllByEmployeeIdAndDateRange(idEmployee:number, anio:number, mes:number){
    return this._bitacoraEntregasRepository.createQueryBuilder("b")
    .leftJoin("b.empleados","empleados")
    .leftJoinAndSelect("b.employeeType","employeeType")
    .leftJoinAndSelect("b.employeeRol","employeeRol")
    .where("empleados.id = :id",{id:idEmployee})
    .getMany();
  }

  async findOne(id: number) {
    const bitacoraExist = await this._bitacoraEntregasRepository.findOne(id);
    if(!bitacoraExist)
      throw new NotFoundException(`No existe bitacora con el id: ${id}`);

    return bitacoraExist;
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
