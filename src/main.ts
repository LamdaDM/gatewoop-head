import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { helmet_Args } from './common/arguments/helmet.arguments';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie'
import { sessionStore_Args } from './common/arguments/session-store.arguments';

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
  
  app.register(fastifyCookie)
  app.register(fastifySession, sessionStore_Args);

  await app.listen(3400);
}

bootstrap();
