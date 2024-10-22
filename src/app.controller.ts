import { Controller, Get, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('CERTIFICATE_SERVICE') private readonly certificateServiceProxy: ClientProxy
    ) {}

    @Get()
    healthCheck(): Observable<string> {
        return this.certificateServiceProxy.send({ cmd: 'healthCheck' }, '');
    }
}
