import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { env } from 'node:process';
import { helmet_Args } from './common/arguments/helmet.arguments';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.use(helmet(helmet_Args));

  app.useGlobalPipes(    
    new ValidationPipe({ 
      disableErrorMessages: false,
      forbidUnknownValues: true,
      validationError: { target: true, value: true },
    }),
  );

  await app.listen(3400);
}

bootstrap();
