import { Controller, Get, Post, Body, Patch, Param, Delete,Query,Res,UseGuards} from '@nestjs/common';
import { InvService } from './inv.service';
import { CreateProductoDto,CreateReport,CreateCategoriaDto,CreateTrabajadorDto,SubStockDto,AddStockDto,CreateAsignacionDto } from './dto/create-inv.dto';
import { UpdateProductoDto,UpdateCategoriaDto,UpdateTrabajadorDto } from './dto/update-inv.dto';
import { Response } from 'express';
import {TipoProducto,TipoAsignacion} from '../../interface/inv-emun'

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { ValidRoles } from '../../auth/interface/valid-roles';
import { RolesGuard } from '../../auth/roles.guard'

@Controller('inv')
export class InvController {
  constructor(private readonly invService: InvService) {}
  


  @Get('pg')
  pg() {
    return this.invService.pgtest();
  }
  
    @UseGuards(JwtAuthGuard)
  @Get('getTrabajadores')
  getTrabajadores() {
    return this.invService.getTrabajadores();
  }

@UseGuards(JwtAuthGuard)
  @Get('getAsignacionDetalle')
  getAsignacionDetalle(@Query('trabajadorId') trabajadorId: string,@Query('familiarId') familiarId: string) {
    return this.invService.getAsignacionDetalle(+trabajadorId,+familiarId);
  }
 
@UseGuards(JwtAuthGuard)
  @Get('getFamiliares/:id')
  getFamiliares(@Param('id') id: string) {
    return this.invService.getFamiliares(+id);
  }
@UseGuards(JwtAuthGuard)
  @Post('producto')
  create(@Body() createInvDto: CreateProductoDto) {
    return this.invService.create(createInvDto);
  }
@UseGuards(JwtAuthGuard)
  @Get('producto/')
  findAll() {
    return this.invService.findAll();
  }
@UseGuards(JwtAuthGuard)
  @Get('productoTipo/:id')
  async findProductoTipo(@Param('id') id: string) {
    return await this.invService.findProductoTipo(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getHistoryProductId/:id')
  getHistoryProductId(@Param('id') id: string) {
    return this.invService.getHistoryProductId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('productoCategoria')
  findProductoCategoria(@Query('id') id: string,@Query('idCategoria') idCategoria: string) {
    return this.invService.ProductoCategoria(+id,+idCategoria);
  }
@UseGuards(JwtAuthGuard)
  @Get('productoAvailable')
  productoAvailable(@Query('id') id: string,@Query('value') value: string) {
    return this.invService.productoAvailable(+id,+value);
  }

@UseGuards(JwtAuthGuard)
  @Get('producto/:id')
  findOne(@Param('id') id: string) {
    return this.invService.findOne(+id);
  }


@UseGuards(JwtAuthGuard)
  @Patch('producto/:id')
  update(@Param('id') id: string, @Body() updateInvDto: UpdateProductoDto) {
    return this.invService.update(+id, updateInvDto);
  }


@UseGuards(JwtAuthGuard)
  @Patch('subStockProduct/:id')
  subStockProduct(@Param('id') id: string, @Body() updateInvDto: SubStockDto) {
    return this.invService.subStockProduct(+id, updateInvDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('addStockProduct/:id')
  addStockProduct(@Param('id') id: string, @Body() updateInvDto: AddStockDto) {
    return this.invService.addStockProduct(+id, updateInvDto);
  }


@UseGuards(JwtAuthGuard)
  @Delete('producto/:id')
  remove(@Param('id') id: string) {
    return this.invService.remove(+id);
  }


  /**************************************************************************************************/
  @UseGuards(JwtAuthGuard)
  @Post('create/Categoria')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.invService.createCategoria(createCategoriaDto);
  }


@UseGuards(JwtAuthGuard)
  @Get('findAll/Categoria')
  findAllCategoria() {
    return this.invService.findAllCategoria();
  }


@UseGuards(JwtAuthGuard)
  @Get('findOne/Categoria/:id')
  findOneCategoria(@Param('id') id: string) {
    return this.invService.findOneCategoria(+id);
  }
  
@UseGuards(JwtAuthGuard)
  @Get('find/CategoriaTipo/:id')
  findCategoriaTipo(@Param('id') id: string) {
    return this.invService.findCategoriaTipo(+id);
  }

@UseGuards(JwtAuthGuard)
  @Patch('update/Categoria/:id')
  updateCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.invService.updateCategoria(+id, updateCategoriaDto);
  }


@UseGuards(JwtAuthGuard)
  @Delete('remove/Categoria/:id')
  removeCategoria(@Param('id') id: string) {
    return this.invService.removeCategoria(+id);
  }
  /**************************************************************************************************/
  
@UseGuards(JwtAuthGuard)
  @Post('create/asignacion')
  createAsignacion(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.invService.createAsignacion(createAsignacionDto);
  }

 @UseGuards(JwtAuthGuard)
  @Post('create/asignacion/pdf')
  async createAsignacionPfd( @Body() createAsignacionDto: CreateAsignacionDto,@Res() res: Response) {

    try {

      let buffer;
      switch (createAsignacionDto.tipo) {
           case TipoAsignacion.FAMILIAR:
              {
                   const {trabajadorId,familiarId,parentesco,productos} = createAsignacionDto;
                   buffer = await this.invService.createAsignacionPdfFamiliar(trabajadorId,familiarId,parentesco,productos);
              }
            break;

          case TipoAsignacion.TRABAJADOR:
                {
                   const {trabajadorId,productos} = createAsignacionDto;
                   buffer = await this.invService.createAsignacionPdfTrabajador(trabajadorId,productos);
                }
            break;

          case TipoAsignacion.OTRO:
                {
                 const {otro,observacion,productos} = createAsignacionDto;
                   buffer = await this.invService.createAsignacionPdfOtro(otro,observacion,productos);
                }
            break;

      }
      
      // Definir los encabezados para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=acta.pdf`);
      
      // Enviar el buffer como respuesta
      res.send(buffer);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('Error generando el reporte');
    }
  }


@UseGuards(JwtAuthGuard)
  @Get('findAll/asignacion')
  findAllAsignacion() {
    return this.invService.findAllAsignacion();
  }


@UseGuards(JwtAuthGuard)
  @Get('findOne/asignacion/:id')
  findOneAsignacion(@Param('id') id: string) {
    return this.invService.findOneAsignacion(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/asignacion/:id')
  removeAsignacion(@Param('id') id: string) {
    return this.invService.deleteAsignacion(+id);
  }

@UseGuards(JwtAuthGuard)
  @Get('findAll/productoAsignacion/:id')
  productoAsignacion(@Param('id') id: string) {
    return this.invService.getProductoAsignacion(+id);
  }


@UseGuards(JwtAuthGuard)
  @Get('findAll/ProductoAsignado2')
  productoAsignado2(@Query('idAsignacion') idAsignacion: string) {
    return this.invService.obtenerProductosPorAsignacion2(+idAsignacion);
  }

@UseGuards(JwtAuthGuard)
   @Get('findAll/ProductoAsignado')
  productoAsignado(@Query('idAsignacion') idAsignacion: string,@Query('idFamiliar') idFamiliar: string) {
    return this.invService.obtenerProductosPorAsignacion(+idAsignacion,+idFamiliar);
  }


@UseGuards(JwtAuthGuard)
@Post('create/report')
  async createReport(@Body() createReport: CreateReport, @Res() res: Response) {
    try {
      // Llamamos al servicio que genera el archivo Excel
      const buffer = await this.invService.generateReportTrabajador(createReport);
      
      // Definir los encabezados para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${createReport.trabajadorId}.xlsx`);
      
      // Enviar el buffer como respuesta
      res.send(buffer);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('Error generando el reporte');
    }
  }
 

 @UseGuards(JwtAuthGuard)
 @Post('create/report/familiar')
  async createReportFamiliar(@Body() createReport: CreateReport, @Res() res: Response) {
    try {
      // Llamamos al servicio que genera el archivo Excel
      const buffer = await this.invService.generateReportFamiliar(createReport);
      
      // Definir los encabezados para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${createReport.familiarId}.xlsx`);
      
      // Enviar el buffer como respuesta
      res.send(buffer);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('Error generando el reporte');
    }
  }


@UseGuards(JwtAuthGuard)
 @Post('create/report/otro')
  async createReportOtro(@Body() createReport: CreateReport, @Res() res: Response) {
    try {
      // Llamamos al servicio que genera el archivo Excel
      const buffer = await this.invService.generateReportOtro(createReport);
      
      // Definir los encabezados para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${createReport.desde}.xlsx`);
      
      // Enviar el buffer como respuesta
      res.send(buffer);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('Error generando el reporte');
    }
  }


@UseGuards(JwtAuthGuard)
 @Post('create/report/total')
  async createReportTotal(@Body() createReport: CreateReport, @Res() res: Response) {
    try {
      // Llamamos al servicio que genera el archivo Excel
      const buffer = await this.invService.generateReportTotal(createReport);
      
      // Definir los encabezados para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=total.xlsx`);
      
      // Enviar el buffer como respuesta
      res.send(buffer);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('Error generando el reporte');
    }
  }

 /*@Post('create/Trabajador')
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
  }*/
/**************************************************************************************************/
/*
  @Post('create/Familiar')
  createFamiliar(@Body() createTrabajadorDto: CreateTrabajadorDto) {
    return this.invService.createTrabajador(createTrabajadorDto);
  }

  @Get('findOne/Familiar/:id')
  findFamiliarByUser(@Param('id') id: string) {
    return this.invService.findOneTrabajador(+id);
  }

  @Patch('update/Familiar/:id')
  updateFamiliar(@Param('id') id: string, @Body() updateTrabajadorDto: UpdateTrabajadorDto) {
    return this.invService.updateTrabajador(+id, updateTrabajadorDto);
  }

  @Delete('remove/Familiar/:id')
  removeTrabajador(@Param('id') id: string) {
    return this.invService.removeTrabajador(+id);
  }*/
/**************************************************************************************************/


}



