import { Injectable } from '@nestjs/common';

@Injectable()
export class EchoService {
    getEcho() {
        return {message:'ECHO!'};
    }
}
