import { All, Body, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('CERTIFICATE_SERVICE') private readonly certificateServiceProxy: ClientProxy
    ) {}

    @All('apis/:service/*')
    handleAllRequests(@Param('service') service: string, @Param() params: any, @Query() query: any, @Body() body: any): Observable<any> {
        const endpoint = params[0];
        const serviceProxy = this.getServiceProxy(service);
        return serviceProxy.send({ cmd: endpoint }, { query, body });
    }

    private getServiceProxy(service: string): ClientProxy {
        switch (service) {
            case 'certificate':
                return this.certificateServiceProxy;
            // Add more cases here for other services
            default:
                throw new Error(`Service ${service} not found`);
        }
    }
}
