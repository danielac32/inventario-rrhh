import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvService } from './inv.service';
import { CreateProductoDto,CreateCategoriaDto,CreateTrabajadorDto } from './dto/create-inv.dto';
import { UpdateProductoDto,UpdateCategoriaDto,UpdateTrabajadorDto } from './dto/update-inv.dto';

@Controller('inv')
export class InvController {
  constructor(private readonly invService: InvService) {}

  @Post('producto')
  create(@Body() createInvDto: CreateProductoDto) {
    return this.invService.create(createInvDto);
  }

  @Get('producto/')
  findAll() {
    return this.invService.findAll();
  }

  @Get('producto/:id')
  findProductoTipo(@Param('id') id: string) {
    return this.invService.findProductoTipo(+id);
  }

  @Get('producto/:id')
  findOne(@Param('id') id: string) {
    return this.invService.findOne(+id);
  }

  @Patch('producto/:id')
  update(@Param('id') id: string, @Body() updateInvDto: UpdateProductoDto) {
    return this.invService.update(+id, updateInvDto);
  }

  @Delete('producto/:id')
  remove(@Param('id') id: string) {
    return this.invService.remove(+id);
  }
  /**************************************************************************************************/
  @Post('create/Categoria')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.invService.createCategoria(createCategoriaDto);
  }

  @Get('findAll/Categoria')
  findAllCategoria() {
    return this.invService.findAllCategoria();
  }

  @Get('findOne/Categoria/:id')
  findOneCategoria(@Param('id') id: string) {
    return this.invService.findOneCategoria(+id);
  }
  
  @Get('find/CategoriaTipo/:id')
  findCategoriaTipo(@Param('id') id: string) {
    return this.invService.findCategoriaTipo(+id);
  }


  @Patch('update/Categoria/:id')
  updateCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.invService.updateCategoria(+id, updateCategoriaDto);
  }

  @Delete('remove/Categoria/:id')
  removeCategoria(@Param('id') id: string) {
    return this.invService.removeCategoria(+id);
  }
  /**************************************************************************************************/
 @Post('create/Trabajador')
  createTrabajador(@Body() createTrabajadorDto: CreateTrabajadorDto) {
    return this.invService.createTrabajador(createTrabajadorDto);
  }

  @Get('findAll/Trabajador')
  findAllTrabajador() {
    return this.invService.findAllTrabajador();
  }

  @Get('findOne/Trabajador/:id')
  findOneTrabajador(@Param('id') id: string) {
    return this.invService.findOneTrabajador(+id);
  }

  @Patch('update/Trabajador/:id')
  updateTrabajador(@Param('id') id: string, @Body() updateTrabajadorDto: UpdateTrabajadorDto) {
    return this.invService.updateTrabajador(+id, updateTrabajadorDto);
  }

  @Delete('remove/Trabajador/:id')
  removeTrabajador(@Param('id') id: string) {
    return this.invService.removeTrabajador(+id);
  }
}
  /**************************************************************************************************/