import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db-connections/prisma.service';

import {productos,categoriasMedicamentos,categoriasUniformes,categoriasEquiposOdontologicos,usuarios,trabajadores} from './data'
@Injectable()
export class SeederService {
  constructor(
    private prisma: PrismaService
  ) {}

   

  async categoria(){
  	const allCategorias = [
      ...categoriasMedicamentos,
      ...categoriasUniformes,
      ...categoriasEquiposOdontologicos,
    ];

    for (const categoria of allCategorias) {
      await this.prisma.categoria.create({
        data: {
          name: categoria.name,
          tipo: categoria.tipo,
        },
      });
    }
  }


  async user(){
  	for (const usuario of usuarios) {
      await this.prisma.user.create({
        data: {
          name: usuario.name,
          email: usuario.email,
          password: usuario.password,
          role: usuario.role,
          isActive: usuario.isActive,
          createdAt: new Date(), // Puedes establecer la fecha actual o usar una específica
          updatedAt: new Date(), // Puedes establecer la fecha actual o usar una específica
        },
      });
    }
  }

/*
  async trabajador(){
  	for (const trabajador of trabajadores) {
      // Crear el trabajador
      const nuevoTrabajador = await this.prisma.trabajador.create({
        data: {
          nombre: trabajador.nombre,
          apellido: trabajador.apellido,
          cedula: trabajador.cedula,
          edad: trabajador.edad,
          direccion: trabajador.direccion,
          oficina: trabajador.oficina,
          observacion: trabajador.observacion,
          createdAt: new Date(), // Establecer la fecha actual
          updatedAt: new Date(),
        },
      });

      console.log(`Trabajador ${nuevoTrabajador.nombre} guardado correctamente`);

      // Crear los familiares del trabajador
      if (trabajador.familiares) {
        for (const familiar of trabajador.familiares) {
          await this.prisma.familiar.create({
            data: {
              nombre: familiar.nombre,
              apellido: familiar.apellido,
              edad: familiar.edad,
              direccion: familiar.direccion,
              relacion: familiar.relacion,
              trabajadorId: nuevoTrabajador.id, // Vincular al trabajador creado
              observacion: familiar.observacion,
              createdAt: new Date(), // Establecer la fecha actual
              updatedAt: new Date(),
            },
          });
        }
      }
    }
  }
  */

  async producto(){
      for (const producto of productos) {
           await this.prisma.producto.create({
                data:{
                      nombre: producto.nombre,
                      descripcion: producto.descripcion,
                      codigo: producto.codigo,
                      stock: producto.stock,
                      tipo: producto.tipo,
                      categoriaId: producto.categoriaId, // Antipiréticos
                }
        });
      }
  }
  async  findAll() {

  	await this.categoria();
  	await this.user();
  	//await this.trabajador();
    await this.producto();

    return `seeder creada`;
  }
}
