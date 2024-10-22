import { Transport } from '@nestjs/microservices';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = {};

    constructor() {
        this.envConfig.port = process.env.PORT;
        this.envConfig.certificateService = {
            name: process.env.CERTIFICATE_SERVICE_NAME || 'CERTIFICATE_SERVICE',
            transport: Transport.TCP,
            options: {
                host: process.env.CERTIFICATE_SERVICE_HOST,
                port: process.env.CERTIFICATE_SERVICE_PORT
            }
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
