import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { InvModule } from './rrhh/inv/inv.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './rrhh/seeder/seeder.module';

@Module({
  imports: [ ConfigModule.forRoot(), AuthModule,InvModule,SeederModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
