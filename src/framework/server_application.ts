import * as chalk from 'chalk';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { APIServerConfiguration } from '../config/api_server.config';
import { RootModule } from '@application/module/.root.module';

export class ServerApplication {
  private readonly host: string = APIServerConfiguration.HOST;
  private readonly port: number = APIServerConfiguration.PORT;
  private readonly enable_log: boolean = APIServerConfiguration.ENABLE_LOG;
  private readonly origin: string = APIServerConfiguration.ORIGIN;
  private readonly global_prefix: string = APIServerConfiguration.GLOBAL_PREFIX;

  public async run(): Promise<void> {
    try {
      const options = {};
      if (!this.enable_log) {
        options['logger'] = false;
      }
      const app = await NestFactory.create(RootModule, options);
      app.enableCors({
        origin: this.origin
      });
      app.setGlobalPrefix(this.global_prefix);
      app.use(helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          'frame-ancestors': ['\'self\'']
        }
      }));
      app.use(helmet.xssFilter());
      app.use(helmet.ieNoOpen());
      app.use(helmet.frameguard());
      app.use(helmet.permittedCrossDomainPolicies());
      ServerApplication.buildAPIDocumentation(app);
      await app.listen(process.env.PORT || this.port, process.env.HOST || this.host);
      Logger.log(
        `Environment: ${chalk
          .green(`${process.env.NODE_ENV?.toUpperCase()}`)
        }`
      );
      process.env.NODE_ENV === 'production'
        ? Logger.log( `✅ Server ready at http://${this.host}:${this.port}`)
        : Logger.log(`✅ Server is listening on port ${this.port}`);
    } catch (error) {
      Logger.error(`❌Error starting server, ${error}`);
      process.exit();
    }
  }

  private static buildAPIDocumentation(app): void {
    const title = 'FightMaster API';
    const description = 'FightMaster API Documentation';
    const version = '1.0.0';
    const tag = 'events';
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag(tag)
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
