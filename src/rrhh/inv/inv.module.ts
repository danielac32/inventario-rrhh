import { Module } from '@nestjs/common';
import { InvService } from './inv.service';
import { InvController } from './inv.controller';
import { PrismaService } from '../../db-connections/prisma.service';


@Module({
  controllers: [InvController],
  providers: [InvService,PrismaService],
  exports:[InvService]
})
export class InvModule {}