import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EchoService } from './echo.service';

@ApiTags('echo')
@Controller('echo')
export class EchoController {
  constructor(private readonly echoService: EchoService) {}

  @Get()
  @ApiOperation({ summary: 'Endpoint to test' })
  getEcho(){
    return this.echoService.getEcho();
  }
}
