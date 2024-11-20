import { HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateProductoDto,CreateReport,CreateCategoriaDto,CreateTrabajadorDto,AddStockDto,SubStockDto ,CreateAsignacionDto} from './dto/create-inv.dto';
import { UpdateProductoDto,UpdateCategoriaDto,UpdateTrabajadorDto } from './dto/update-inv.dto';
import { PrismaService } from '../../db-connections/prisma.service';
import {TipoProducto,TipoAsignacion} from '../../interface/inv-emun'
import {PostgresService} from '../../db-connections/postgres.service'
import * as ExcelJS from 'exceljs';
import { Buffer } from 'buffer';


@Injectable()
export class InvService {
  constructor(
    private prisma: PrismaService,
    private postgresService: PostgresService
    ) {}
  

  async pgtest() {
    const query = 'select * from personal;'; // Cambia 'productos' por tu tabla real
    const result = await this.postgresService.query(query);
    return result.rows;
  }



async getAsignacionDetalle(trabajadorId: number, familiarId: number) {
  try {
    // Consultar el trabajador por ID
    const trabajadorQuery = `
      SELECT id_personal, cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido
      FROM personal
      WHERE id_personal = $1
    `;
    const trabajadorResult = await this.postgresService.query(trabajadorQuery, [trabajadorId]);

    // Verificar si se encontró el trabajador
   // if (trabajadorResult.rows.length === 0) {
    //  throw new HttpException('Trabajador not found', 404);
   // }

    // Consultar el familiar por ID y trabajadorId
    const familiarQuery = `
      SELECT id_familiar, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cedula_familiar, parentesco, id_personal
      FROM familiar
      WHERE id_familiar = $1 AND id_personal = $2
    `;
    const familiarResult = await this.postgresService.query(familiarQuery, [familiarId, trabajadorId]);

    // Verificar si se encontró el familiar
    //if (familiarResult.rows.length === 0) {
    //  throw new HttpException('Familiar not found or does not match with trabajador', 404);
   // }

    return {
      trabajador: trabajadorResult.rows[0],
      familiar: familiarResult.rows[0]
    };
  } catch (error) {
    throw new HttpException('Error fetching trabajador and familiar', 500);
  }
}


  async getTrabajadores() {
    const query = 'select id_personal, cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido from personal ;'; // Cambia 'productos' por tu tabla real
    const result = await this.postgresService.query(query);
    return {trabajador:result.rows}
  }

async getFamiliares(id: number) {
  const query = `
    SELECT id_familiar, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cedula_familiar,parentesco ,id_personal
    FROM familiar
    WHERE id_personal = $1
  `;
  const result = await this.postgresService.query(query, [id]);
  return { familiar: result.rows };
}

async getFamiliar(id: number) {
  const query = `
    SELECT primer_nombre, primer_apellido, cedula_familiar,parentesco 
    FROM familiar
    WHERE id_familiar = $1
  `;
  const result = await this.postgresService.query(query, [id]);
  //return { familiar: result.rows };
  return result.rows;
}

 async obtenerProductosPorAsignacion(id_asignacion: number,idFamiliar:number) {
  try {
    // Busca todos los productos asignados relacionados con la asignación específica
    const productosAsignados = await this.prisma.productoAsignado.findMany({
      where: {
        asignacionId: id_asignacion,
      },
    });

    const familiar=await this.getFamiliar(idFamiliar);
    return {
      familiar,
      productos: productosAsignados,
    };
  } catch (error) {
    throw new HttpException(
      error.message || 'Error al obtener los productos asignados',
      error.status || 500,
    );
  }
}


 async obtenerProductosPorAsignacion2(id_asignacion: number) {
  try {
    // Busca todos los productos asignados relacionados con la asignación específica
    const productosAsignados = await this.prisma.productoAsignado.findMany({
      where: {
        asignacionId: id_asignacion,
      },
    });

    return {
      productos: productosAsignados,
    };
  } catch (error) {
    throw new HttpException(
      error.message || 'Error al obtener los productos asignados',
      error.status || 500,
    );
  }
}



  async  findAllAsignacion() {
    try{
      const asignacion = await this.prisma.asignacion.findMany();
      return{
        asignacion
      }
    } catch (error) {
            throw new HttpException('Error creating asignacion', 500);
    }
  }
  
    private async getAsignacion(id:number) {
    try{
        const asignacion = await this.prisma.asignacion.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return asignacion;
    } catch (error) {
        throw new HttpException('Error findOne asignacion', 500);
    }
  }
   private async getAsignacionByTrabajador(id:number) {
    try{
        const asignacion = await this.prisma.asignacion.findMany({
            where: {
                    trabajadorId: Number(id)
            },include:{
                productos:true
            }
        });
        return asignacion;
    } catch (error) {
        throw new HttpException('Error findOne asignacion', 500);
    }
  }

  async  findOneAsignacion(id: number) {
      const asignacion= await this.getAsignacionByTrabajador(id);
      if(!asignacion)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          asignacion
      }
  }
  
  async deleteAsignacion(id: number) {
    try {
      // Verificar si la asignación existe
      const asignacion = await this.prisma.asignacion.findUnique({
        where: { id },
      });

      if (!asignacion) {
        throw new HttpException('Asignacion not found', 404);
      }

      // Eliminar los productos relacionados a la asignación
      await this.prisma.productoAsignado.deleteMany({
        where: { asignacionId: id },
      });

      // Eliminar la asignación
      await this.prisma.asignacion.delete({
        where: { id },
      });

      return { message: 'Asignacion and related products deleted successfully' };
    } catch (error) {
      throw new HttpException('Error deleting asignacion', 500);
    }
  }

 
  async createAsignacion(createAsignacionDto: CreateAsignacionDto){
    try{
        let asignacion;
        switch (createAsignacionDto.tipo) {
          case TipoAsignacion.FAMILIAR:
              {
                asignacion = await this.prisma.asignacion.create({
                        data:{
                            trabajadorId:createAsignacionDto.trabajadorId,
                            familiarId:createAsignacionDto.familiarId,
                            tipo:createAsignacionDto.tipo,
                            observacion:createAsignacionDto.observacion
                        }
                });
              }
            break;

          case TipoAsignacion.TRABAJADOR:
                {
                  asignacion = await this.prisma.asignacion.create({
                          data:{
                              trabajadorId:createAsignacionDto.trabajadorId,
                              tipo:createAsignacionDto.tipo,
                              observacion:createAsignacionDto.observacion
                          }
                  });
                }
            break;

          case TipoAsignacion.OTRO:
                {
                  asignacion = await this.prisma.asignacion.create({
                          data:{
                              otro:createAsignacionDto.otro,
                              tipo:createAsignacionDto.tipo,
                              observacion:createAsignacionDto.observacion
                          }
                  });
                }
            break;

          default:
            return { }
            break;
        }

        if(!asignacion) throw new HttpException('Error creating asignacion', 500);


        if (createAsignacionDto.productos && createAsignacionDto.productos.length > 0) {
            const productosAsignados = createAsignacionDto.productos.map(producto => ({
              asignacionId: asignacion.id,
              productId: producto.id,
              name: producto.name,
              quantity: producto.quantity,
            }));


            await this.prisma.productoAsignado.createMany({
              data: productosAsignados,
            });

            for (const producto of productosAsignados) {
                const productoEnDB = await this.prisma.producto.findUnique({
                  where: { id: producto.productId },
                });
                if (productoEnDB.stock < producto.quantity) {
                    throw new Error(
                      `No hay suficiente stock para el producto "${productoEnDB.nombre}". Disponible: ${productoEnDB.stock}, solicitado: ${producto.quantity}`
                    );
                }
                await this.prisma.producto.update({
                  where: { id: producto.productId },
                  data: { stock: productoEnDB.stock - producto.quantity },
                });


            }
        }

        return {
                  asignacion
               }
    } catch (error) {
            throw new HttpException('Error creating asignacion', 500);
    }
  }



  async  create(createProductoDto: CreateProductoDto) {
    try{
        const producto = await this.prisma.producto.create({
                data:{
                    ...createProductoDto,
                    modificaciones: {
                      create: {
                         cantidad:createProductoDto.stock,
                         observacion:createProductoDto.descripcion,
                         entregado:"NO", 
                         tipo:"CREADO"
                      }
                    }
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
      const producto = await this.prisma.producto.findMany({

        include: {
               categoria:true
             }
      });
      return{
        producto
      }
    } catch (error) {
            throw new HttpException('Error creating producto', 500);
    }
  }


  async  ProductoCategoria(id: number,idCategoria:number) {
    try{
        let producto=[];

        if(id === 0){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.MEDICAMENTOS,
                        categoriaId:idCategoria
                },
              include: {
               categoria:true
             }
          });
        }else if(id === 1){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
                        categoriaId:idCategoria
                },
              include: {
               categoria:true
             }
          });
        }else if(id === 2){
            producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.UNIFORMES,
                        categoriaId:idCategoria
                },
              include: {
               categoria:true
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

  async getHistoryProductId(id: number) {
    const modificaciones = await this.prisma.modificacion.findMany({
        where: { productoId: id }
    });

    return {modificaciones};
}


  async  findProductoTipo(id: number) {
    try{
        let producto=[];

        if(id === 0){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.MEDICAMENTOS
                },
              include: {
               categoria:true
             }
          });
        }else if(id === 1){
          producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS
                },
              include: {
               categoria:true
             }
          });
        }else if(id === 2){
            producto = await this.prisma.producto.findMany({
                where: {
                        tipo: TipoProducto.UNIFORMES
                },
              include: {
               categoria:true
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

  async productoAvailable(id:number,value:number){
      const producto= await this.getProducto(id);
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);

      if(Number(producto.stock)>=Number(value)){
         return {verify:true}
      }
      return {verify:false}
  }



  async getProductoAsignacion(tipo:number) {
    try{
        let asignacion;
        if(tipo===0){
            asignacion = await this.prisma.asignacion.findMany({
                where: {
                     tipo:"TRABAJADOR"
                },
                include: {
                   productos:true
                }
            });

        }else if(tipo===1){
            asignacion = await this.prisma.asignacion.findMany({
                where: {
                     tipo:"FAMILIAR"
                },
                include: {
                   productos:true
                }
            });
        }else if(tipo===2){
            asignacion = await this.prisma.asignacion.findMany({
                where: {
                     tipo:"OTRO"
                },
                include: {
                   productos:true
                }
            });
        }

        return {asignacion};
    } catch (error) {
        throw new HttpException('Error findOne producto', 500);
    }
  }


  private async getProducto(id:number) {
    try{
        const producto = await this.prisma.producto.findFirst({
            where: {
                    id: Number(id)
            },
            include: {
               categoria:true
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


 
async subStockProduct(id: number, updateInvDto: SubStockDto) {
  const producto = await this.getProducto(id);
  if (!producto) throw new NotFoundException(`Entity with ID ${id} not found`);

  const { cantidad, observacion, entregado, tipo ,stock } = updateInvDto;
  
  const updatedProducto = await this.prisma.producto.update({
    where: {
      id: producto.id
    },
    data: {
      stock:cantidad,
      modificaciones: {
        create: {
           cantidad:stock, observacion, entregado, tipo
        }
      }
    }
  });

  return { updatedProducto };
}



  async  addStockProduct(id: number, updateInvDto: AddStockDto) {
    const producto= await this.getProducto(id);
    if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);

   const { cantidad, entregado, tipo,stock } = updateInvDto;
  
  const updatedProducto = await this.prisma.producto.update({
    where: {
      id: producto.id
    },
    data: {
     stock:cantidad,
      modificaciones: {
        create: {
           cantidad:stock, entregado, tipo
        }
      }
    }
  });

  return { updatedProducto };
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
        const categoria = await this.prisma.categoria.create({
                data:{
                    ...createCategoriaDto,
                }
        });
        return {
            categoria
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
/*
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
  }*/
/**************************************************************************************************/
async generateReport2(createReport: CreateReport) {
    // Convertir las fechas desde y hasta a objetos Date
    const desdeDate = new Date(createReport.desde);
    const hastaDate = new Date(createReport.hasta);

    // Obtener las asignaciones y los productos asignados para el trabajador en el rango de fechas
    const asignaciones = await this.prisma.asignacion.findMany({
      where: {
        trabajadorId: createReport.trabajadorId,  // Filtrar por trabajadorId
        familiarId:null,
        otro:null,
        createdAt: {
          gte: desdeDate,  // Desde
          lte: hastaDate,  // Hasta
        },
      },
      select: {
        observacion:true,//id: true,  // ID de la asignación
        productos: {
          select: {
            id: true,  // ID del producto asignado
            name: true,    // Nombre del producto
          },
        },
        createdAt: true,  // Fecha de creación
      },
    });

    // Crear el libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Asignaciones');

    // Agregar encabezados
    worksheet.addRow(['Observación', 'Fecha de Asignación', 'Cantidad de Productos Asignados', 'Nombres de Productos']);

// Agregar los datos de las asignaciones
asignaciones.forEach(asignacion => {
  // Concatenar los nombres de los productos en una cadena separada por comas
  const nombresProductos = asignacion.productos.map(producto => producto.name).join(', ');

  worksheet.addRow([
      asignacion.observacion,
      asignacion.createdAt.toISOString().split('T')[0],  // Solo la fecha (sin la hora)
      asignacion.productos.length,  // Cantidad de productos asignados
      nombresProductos,  // Nombres de productos asignados
    ]);
  });

    // Generar el buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;  // Devuelve el buffer para enviarlo al cliente
  }


async generateReportTrabajador(createReport: CreateReport) {
    // Convertir las fechas desde y hasta a objetos Date
    const desdeDate = new Date(createReport.desde);
    const hastaDate = new Date(createReport.hasta);

    // Obtener las asignaciones y los productos asignados para el trabajador en el rango de fechas
    const asignaciones = await this.prisma.asignacion.findMany({
      where: {
        trabajadorId: createReport.trabajadorId,  // Filtrar por trabajadorId
        familiarId:createReport.familiarId,
        otro:null,
        createdAt: {
          gte: desdeDate,  // Desde
          lte: hastaDate,  // Hasta
        },
      },
      select: {
        observacion:true,//id: true,  // ID de la asignación
        productos: {
          select: {
            id: true,  // ID del producto asignado
            name: true,    // Nombre del producto
            quantity:true,
          },
        },
        createdAt: true,  // Fecha de creación
      },
    });

    // Crear el libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Asignaciones');

    // Agregar encabezados

    const row = worksheet.addRow(['Trabajador', createReport.nombre, createReport.apellido, createReport.cedula]);

// Establecer el color de fondo de la fila en verde
row.eachCell(cell => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF00FF00' }, // Color verde en formato ARGB
  };
});

    worksheet.addRow(['Observación', 'Fecha de Asignación', 'Cantidad de Productos Asignados', 'Nombres de Productos']);

// Agregar los datos de las asignaciones
asignaciones.forEach(asignacion => {
  // Crear la fila base con observación, fecha y cantidad de productos
  const baseRow = [
    asignacion.observacion,
    asignacion.createdAt.toISOString().split('T')[0], // Solo la fecha
    asignacion.productos.length, // Cantidad de productos asignados
  ];

  // Extraer los nombres y cantidades de los productos como celdas individuales
  const productoCeldas = asignacion.productos.map(producto => `${producto.name} (${producto.quantity})`);

  // Combinar la fila base con las celdas de productos
  const completeRow = [...baseRow, ...productoCeldas];

  // Agregar la fila al worksheet
  worksheet.addRow(completeRow);
});



    // Generar el buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;  // Devuelve el buffer para enviarlo al cliente
  }



/**************************************************************************************************/
async generateReportFamiliar(createReport: CreateReport) {
    // Convertir las fechas desde y hasta a objetos Date
    const desdeDate = new Date(createReport.desde);
    const hastaDate = new Date(createReport.hasta);

    // Obtener las asignaciones y los productos asignados para el trabajador en el rango de fechas
    const asignaciones = await this.prisma.asignacion.findMany({
      where: {
        trabajadorId: createReport.trabajadorId,  // Filtrar por trabajadorId
        familiarId:createReport.familiarId,
        otro:null,
        createdAt: {
          gte: desdeDate,  // Desde
          lte: hastaDate,  // Hasta
        },
      },
      select: {
        observacion:true,//id: true,  // ID de la asignación
        productos: {
          select: {
            id: true,  // ID del producto asignado
            name: true,    // Nombre del producto
            quantity:true,
          },
        },
        createdAt: true,  // Fecha de creación
      },
    });

    // Crear el libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Asignaciones');

    // Agregar encabezados

    const row = worksheet.addRow(['Familiar', createReport.parentesco, createReport.nombre, createReport.apellido, createReport.cedula]);

// Establecer el color de fondo de la fila en verde
row.eachCell(cell => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF00FF00' }, // Color verde en formato ARGB
  };
});

    worksheet.addRow(['Observación', 'Fecha de Asignación', 'Cantidad de Productos Asignados', 'Nombres de Productos']);

// Agregar los datos de las asignaciones
asignaciones.forEach(asignacion => {
  // Crear la fila base con observación, fecha y cantidad de productos
  const baseRow = [
    asignacion.observacion,
    asignacion.createdAt.toISOString().split('T')[0], // Solo la fecha
    asignacion.productos.length, // Cantidad de productos asignados
  ];

  // Extraer los nombres y cantidades de los productos como celdas individuales
  const productoCeldas = asignacion.productos.map(producto => `${producto.name} (${producto.quantity})`);

  // Combinar la fila base con las celdas de productos
  const completeRow = [...baseRow, ...productoCeldas];

  // Agregar la fila al worksheet
  worksheet.addRow(completeRow);
});



    // Generar el buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;  // Devuelve el buffer para enviarlo al cliente
  }



/*********************************************************************************/
async generateReportOtro(createReport: CreateReport) {
    // Convertir las fechas desde y hasta a objetos Date
    const desdeDate = new Date(createReport.desde);
    const hastaDate = new Date(createReport.hasta);

    // Obtener las asignaciones y los productos asignados para el trabajador en el rango de fechas
    const asignaciones = await this.prisma.asignacion.findMany({
      where: {
        trabajadorId: null,  // Filtrar por trabajadorId
        familiarId:null,
        createdAt: {
          gte: desdeDate,  // Desde
          lte: hastaDate,  // Hasta
        },
      },
      select: {
        observacion:true,//id: true,  // ID de la asignación
        otro:true,
        productos: {
          select: {
            id: true,  // ID del producto asignado
            name: true,    // Nombre del producto
            quantity:true,
          },
        },
        createdAt: true,  // Fecha de creación
      },
    });

    // Crear el libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Asignaciones');

    // Agregar encabezados

   let row= worksheet.addRow(['Observación', 'Recibe','Fecha de Asignación', 'Cantidad de Productos Asignados', 'Nombres de Productos']);
    
    row.eachCell(cell => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF00FF00' }, // Color verde en formato ARGB
  };
});
// Agregar los datos de las asignaciones
asignaciones.forEach(asignacion => {
  // Crear la fila base con observación, fecha y cantidad de productos
  const baseRow = [
    asignacion.observacion,
    asignacion.otro,
    asignacion.createdAt.toISOString().split('T')[0], // Solo la fecha
    asignacion.productos.length, // Cantidad de productos asignados
  ];

  // Extraer los nombres y cantidades de los productos como celdas individuales
  const productoCeldas = asignacion.productos.map(producto => `${producto.name} (${producto.quantity})`);

  // Combinar la fila base con las celdas de productos
  const completeRow = [...baseRow, ...productoCeldas];

  // Agregar la fila al worksheet
  worksheet.addRow(completeRow);
});



    // Generar el buffer Excel
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;  // Devuelve el buffer para enviarlo al cliente
  }
/*********************************************************************************/
async generateReportTotal(createReport: CreateReport) {
  // Convertir las fechas desde y hasta a objetos Date
  const desdeDate = new Date(createReport.desde);
  const hastaDate = new Date(createReport.hasta);

  // Obtener las asignaciones y los productos asignados para el rango de fechas
  const asignaciones = await this.prisma.asignacion.findMany({
    where: {
      createdAt: {
        gte: desdeDate,  // Desde
        lte: hastaDate,  // Hasta
      },
    },
    select: {
      trabajadorId: true,
      familiarId: true,
      otro: true,
      observacion: true,
      productos: {
        select: {
          id: true,
          name: true,
          quantity: true,
        },
      },
      createdAt: true,
    },
  });

  // Crear el libro de Excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte de Asignaciones');

  // Agregar encabezados
  const headerRow = worksheet.addRow([
    'Propietario',
    'Observación',
    'Recibe',
    'Fecha de Asignación',
    'Cantidad de Productos Asignados',
    'Nombres de Productos',
  ]);

  // Estilo para encabezados
  headerRow.eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00FF00' }, // Verde
    };
    cell.font = { bold: true };
  });

  // Procesar asignaciones y clasificar propietario
  asignaciones.forEach(asignacion => {
    let propietario = '';
    if (asignacion.trabajadorId && !asignacion.familiarId && !asignacion.otro) {
      propietario = 'Trabajador';
    } else if (asignacion.familiarId && asignacion.trabajadorId && !asignacion.otro) {
      propietario = 'Familiar';
    } else if (!asignacion.trabajadorId && !asignacion.familiarId && asignacion.otro) {
      propietario = 'Otro';
    }

    // Crear la fila base con propietario, observación, y fecha
    const baseRow = [
      propietario,
      asignacion.observacion,
      asignacion.otro || 'N/A', // Mostrar "N/A" si otro es null
      asignacion.createdAt.toISOString().split('T')[0], // Solo la fecha
      asignacion.productos.length, // Cantidad de productos asignados
    ];

    // Extraer los nombres y cantidades de los productos como celdas individuales
    const productoCeldas = asignacion.productos.map(
      producto => `${producto.name} (${producto.quantity})`
    );

    // Combinar la fila base con las celdas de productos
    const completeRow = [...baseRow, ...productoCeldas];

    // Agregar la fila al worksheet
    worksheet.addRow(completeRow);
  });

  // Generar el buffer Excel
  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;  // Devuelve el buffer para enviarlo al cliente
}


}


