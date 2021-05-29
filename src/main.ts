import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifySession from 'fastify-session';
import fastifyCookie from 'fastify-cookie'
import { fastifyHelmet } from 'fastify-helmet';
import { validationPipe_Args } from './common/lib/validation-pipe/validation-pipe.arguments.pub';
import { sessionStore_Args, helmet_Args } from './common/secret-args/arguments.priv';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  app.register(fastifyCookie)
  app.register(fastifySession, sessionStore_Args);
  app.register(fastifyHelmet, helmet_Args)

  app.useGlobalPipes(new ValidationPipe(validationPipe_Args));

  await app.listen(3400);
}

bootstrap();
