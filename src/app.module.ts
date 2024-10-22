import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigService } from './config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [
        ConfigService,
        {
            provide: 'CERTIFICATE_SERVICE',
            useFactory: (configService: ConfigService) => {
                const options = configService.get('certificateService');
                return ClientProxyFactory.create(options);
            },
            inject: [ConfigService]
        },
        AppService
    ]
})
export class AppModule {}
