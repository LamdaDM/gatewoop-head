import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { env } from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: { 
          "default-src": [env.CSP_DEFAULT_SRC],
        },
      },
      crossOriginOpenerPolicy: {
        policy: env.COOP_POLICY,
      },
      crossOriginResourcePolicy: {
        policy: env.CORP_POLICY,
      },
      expectCt: {
        maxAge: parseInt(env.ECT_MAX_AGE),
        enforce: Boolean(JSON.parse(env.ECT_ENFORCE)),
        reportUri: env.ECT_REPORT_URI,
      },
      noSniff: true,
    })
  )

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
