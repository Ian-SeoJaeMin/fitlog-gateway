import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const config = new ConfigService();
    const port = config.get('port');

    const app = await NestFactory.create(AppModule);
    await app.listen(port);

    Logger.log(`🚀 Gateway server is running on : http://localhost:${port}`);
}
bootstrap();
