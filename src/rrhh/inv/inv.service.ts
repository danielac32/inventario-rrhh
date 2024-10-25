import { HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateProductoDto,CreateCategoriaDto,CreateTrabajadorDto } from './dto/create-inv.dto';
import { UpdateProductoDto,UpdateCategoriaDto,UpdateTrabajadorDto } from './dto/update-inv.dto';
import { PrismaService } from '../../db-connections/prisma.service';
import {TipoProducto} from '../../interface/inv-emun'


@Injectable()
export class InvService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async  create(createProductoDto: CreateProductoDto) {
    try{
        const producto = await this.prisma.producto.create({
                data:{
                    ...createProductoDto,
                }
        });
        return {
            producto
        }
    } catch (error) {
            throw new HttpException('Error creating producto', 500);
    }
  }

  async  findAll() {
    try{
      const producto = await this.prisma.producto.findMany();
      return{
        producto
      }
    } catch (error) {
            throw new HttpException('Error creating producto', 500);
    }
  }

  async  findProductoTipo(id: number) {
    try{
        let producto=[];

        if(id === 0){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.MEDICAMENTOS
                }
          });
        }else if(id === 1){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS
                }
          });
        }else if(id === 2){
            producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.UNIFORMES
                }
          });
        }
      return{
        producto
      }
    } catch (error) {
            throw new HttpException('Error creating producto', 500);
    }
  }


  private async getProducto(id:number) {
    try{
        const producto = await this.prisma.producto.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return producto;
    } catch (error) {
        throw new HttpException('Error findOne producto', 500);
    }
  }


  async  findOne(id: number) {
    const producto= await this.getProducto(id);
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          producto
      }
  }

  async  update(id: number, updateInvDto: UpdateProductoDto) {
    const producto= await this.getProducto(id);
    if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedproducto = await this.prisma.producto.update({
        where: {
          id: producto.id
        },
        data:{
          ...updateInvDto
        }
    });
    return {updateInvDto};
  }

  async  remove(id: number) {
    const producto= await this.getProducto(id);
    if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
    const deletedproducto = await this.prisma.producto.delete({
      where: {
        id: producto.id
      },
    });
    return {deletedproducto}
  }
/**************************************************************************************************/

  async  createCategoria(createCategoriaDto: CreateCategoriaDto) {
     try{
        const charges = await this.prisma.categoria.create({
                data:{
                    ...createCategoriaDto,
                }
        });
        return {
            charges
        }
    } catch (error) {
            throw new HttpException('Error creating categoria', 500);
    }
  }

  async  findAllCategoria() {
    try{
      const categoria = await this.prisma.categoria.findMany();
      return{
        categoria
      }
    } catch (error) {
            throw new HttpException('Error creating categoria', 500);
    }
  }
  
  async  findCategoriaTipo(id:number) {
    try{
        let categoria=[];

        if(id === 0){
          categoria = await this.prisma.categoria.findMany({
                where: {
                        tipo: TipoProducto.MEDICAMENTOS
                }
          });
        }else if(id === 1){
          categoria = await this.prisma.categoria.findMany({
                where: {
                        tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS
                }
          });
        }else if(id === 2){
            categoria = await this.prisma.categoria.findMany({
                where: {
                        tipo: TipoProducto.UNIFORMES
                }
          });
        }
      return{
        categoria
      }
    } catch (error) {
            throw new HttpException('Error creating categoria', 500);
    }
  }



  private async getCategoria(id:number) {
    try{
        const categoria = await this.prisma.categoria.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return categoria;
    } catch (error) {
        throw new HttpException('Error findOne categoria', 500);
    }
  }

  async  findOneCategoria(id: number) {
      const categoria= await this.getCategoria(id);
      if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          categoria
      }
  }

  async  updateCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria= await this.getCategoria(id);
    if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedCharge = await this.prisma.categoria.update({
        where: {
          id: categoria.id
        },
        data:{
          ...updateCategoriaDto
        }
    });
    return {updatedCharge};
  }

  async  removeCategoria(id: number) {
     const categoria= await this.getCategoria(id);
    if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedcategoria = await this.prisma.categoria.delete({
      where: {
        id: categoria.id
      },
    });
    return {deletedcategoria}
  }
/**************************************************************************************************/

  async  createTrabajador(createTrabajadorDto: CreateTrabajadorDto) {
     try{
        const trabajador = await this.prisma.trabajador.create({
                data:{
                    ...createTrabajadorDto,
                }
        });
        return {
            trabajador
        }
    } catch (error) {
            throw new HttpException('Error creating categoria', 500);
    }
  }

  async  findAllTrabajador() {
    try{
      const trabajador = await this.prisma.trabajador.findMany({
           include: {
             familiares:true
           }
      });
      return{
        trabajador
      }
    } catch (error) {
            throw new HttpException('Error creating trabajador', 500);
    }
  }
  
  private async getTrabajador(id:number) {
    try{
        const trabajador = await this.prisma.trabajador.findFirst({
            where: {
                    id: Number(id)
            },
            include: {
             familiares:true
           }
        });
        return trabajador;
    } catch (error) {
        throw new HttpException('Error findOne trabajador', 500);
    }
  }

  async  findOneTrabajador(id: number) {
      const trabajador= await this.getTrabajador(id);
      if(!trabajador)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          trabajador
      }
  }

  async  updateTrabajador(id: number, UpdateTrabajadorDto: UpdateTrabajadorDto) {
    const trabajador= await this.getTrabajador(id);
    if(!trabajador)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedCharge = await this.prisma.trabajador.update({
        where: {
          id: trabajador.id
        },
        data:{
          ...UpdateTrabajadorDto
        }
    });
    return {updatedCharge};
  }

  async  removeTrabajador(id: number) {
     const trabajador= await this.getTrabajador(id);
    if(!trabajador)throw new NotFoundException(`Entity with ID ${id} not found`);

   /* const deletedCharge = await this.prisma.trabajador.delete({
      where: {
        id: trabajador.id
      },
    });
    return {deletedCharge}*/

    await this.prisma.$transaction(async (prisma) => {
      // Elimina todas las asignaciones relacionadas con el trabajador
      await prisma.asignacion.deleteMany({
        where: { trabajadorId: trabajador.id },
      });

      // Elimina todos los familiares relacionados con el trabajador
      await prisma.familiar.deleteMany({
        where: { trabajadorId: trabajador.id },
      });

      // Finalmente, elimina el trabajador
      await prisma.trabajador.delete({
        where: { id: trabajador.id },
      });
    });
  }
/**************************************************************************************************/

/**************************************************************************************************/
}
