import { Module } from '@nestjs/common';
import { InvService } from './inv.service';
import { InvController } from './inv.controller';

@Module({
  controllers: [InvController],
  providers: [InvService],
})
export class InvModule {}
