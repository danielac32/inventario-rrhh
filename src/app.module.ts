import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { InvModule } from './rrhh/inv/inv.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './rrhh/seeder/seeder.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [ 
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta donde están los archivos estáticos
      serveRoot: '/public/', // Ruta base desde donde se servirán los archivos estáticos
    }),
  ConfigModule.forRoot(), AuthModule,InvModule,SeederModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
