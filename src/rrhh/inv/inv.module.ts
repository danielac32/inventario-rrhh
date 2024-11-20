import { Module } from '@nestjs/common';
import { InvService } from './inv.service';
import { InvController } from './inv.controller';
import { PrismaService } from '../../db-connections/prisma.service';
import {PostgresService} from '../../db-connections/postgres.service'

@Module({
  controllers: [InvController],
  providers: [InvService,PrismaService,PostgresService],
  exports:[InvService]
})
export class InvModule {}