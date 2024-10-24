import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InvModule } from './rrhh/inv/inv.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot(), AuthModule,InvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
