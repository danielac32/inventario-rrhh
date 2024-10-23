import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvService } from './inv.service';
import { CreateInvDto } from './dto/create-inv.dto';
import { UpdateInvDto } from './dto/update-inv.dto';

@Controller('inv')
export class InvController {
  constructor(private readonly invService: InvService) {}

  @Post()
  create(@Body() createInvDto: CreateInvDto) {
    return this.invService.create(createInvDto);
  }

  @Get()
  findAll() {
    return this.invService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvDto: UpdateInvDto) {
    return this.invService.update(+id, updateInvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invService.remove(+id);
  }
}
