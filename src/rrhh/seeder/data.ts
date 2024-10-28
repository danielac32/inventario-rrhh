import { ValidRoles } from '../../auth/interface/valid-roles';
import * as bcrypt from 'bcrypt';


import { ICategoria,IUser,ITrabajador,IFamiliar} from '../../interface/inv-interface';
import {Role,TipoProducto,TipoModificacion} from '../../interface/inv-emun'
// Ejemplo de datos de prueba para ICategoria

export const categoriasMedicamentos: ICategoria[] = [
  {
    name: "Antibióticos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Analgésicos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Antiinflamatorios",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Antidepresivos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Antihistamínicos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Antipiréticos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Vacunas",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Medicamentos para Diabetes",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Medicamentos Cardiovasculares",
    tipo: TipoProducto.MEDICAMENTOS,
  },
  {
    name: "Suplementos Vitaminicos",
    tipo: TipoProducto.MEDICAMENTOS,
  },
];


export const categoriasUniformes: ICategoria[] = [
  {
    name: "Uniformes Escolares",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Uniformes para Limpieza",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Uniformes de Trabajo",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Zapatos Escolares",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Ropa de Protección",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Uniformes para Analistas",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Uniformes para Personal de Salud",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Accesorios para Uniformes",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Ropa de Oficina",
    tipo: TipoProducto.UNIFORMES,
  },
  {
    name: "Uniformes Deportivos",
    tipo: TipoProducto.UNIFORMES,
  },
];

export const categoriasEquiposOdontologicos: ICategoria[] = [
  {
    name: "Exploradores Dentales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Espejos Dentales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Pinzas de Extracción",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Jeringas Dentales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Material de Relleno",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Impresiones Dentales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Radiografías Dentales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Equipos de Esterilización",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Protectores Bucales",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
  {
    name: "Consultorios Móviles",
    tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  },
];


/*********************************************************************************************************/
export const usuarios: IUser[] = [
  {
    //id: 1,
    name: "daniel quintero",
    email: "admin@admin.com",
    password: bcrypt.hashSync('123456', 10),
    role: Role.ADMIN,
    isActive: true,
    //createdAt: new Date("2023-01-01"),
    //updatedAt: new Date("2023-01-10"),
  },
  {
    //id: 2,
    name: "otro",
    email: "otro@otro.com",
    password: bcrypt.hashSync('123456', 10),
    role: Role.USER,
    isActive: true,
    //createdAt: new Date("2023-02-01"),
    //updatedAt: new Date("2023-02-15"),
  },
  {
   // id: 3,
    name: "otro2",
    email: "otro2@otro2.com",
    password: bcrypt.hashSync('123456', 10),
    role: Role.USER,
    isActive: false,
    //createdAt: new Date("2023-03-01"),
    //updatedAt: new Date("2023-03-05"),
  },
];
/*********************************************************************************************************/
 
export const trabajadores: ITrabajador[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    cedula: "12345678",
    edad: 35,
    direccion: "Calle 1, Ciudad",
    oficina: "RRHH",
    familiares: [
      {
        id: 1,
        nombre: "Ana",
        apellido: "González",
        edad: 34,
        direccion: "Calle 1, Ciudad",
        relacion: "esposa",
        trabajadorId: 1,
        observacion: "Ama de casa",
        //createdAt: new Date("2023-01-01"),
        //updatedAt: new Date("2023-01-10"),
      },
      {
        id: 2,
        nombre: "Carlos",
        apellido: "Pérez",
        edad: 10,
        direccion: "Calle 1, Ciudad",
        relacion: "hijo",
        trabajadorId: 1,
        observacion: "Estudiante",
        //createdAt: new Date("2023-01-01"),
        //updatedAt: new Date("2023-01-10"),
      },
    ],
    //createdAt: new Date("2022-12-01"),
    //updatedAt: new Date("2023-01-10"),
  },
  {
    id: 2,
    nombre: "María",
    apellido: "López",
    cedula: "87654321",
    edad: 30,
    direccion: "Avenida 2, Ciudad",
    oficina: "Tecnología",
    familiares: [
      {
        id: 3,
        nombre: "Sofía",
        apellido: "López",
        edad: 5,
        direccion: "Avenida 2, Ciudad",
        relacion: "hija",
        trabajadorId: 2,
        observacion: "Estudiante de jardín",
        //createdAt: new Date("2023-02-15"),
        //updatedAt: new Date("2023-03-10"),
      },
    ],
    //createdAt: new Date("2023-01-15"),
    //updatedAt: new Date("2023-02-15"),
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Sánchez",
    cedula: "11223344",
    edad: 40,
    direccion: "Boulevard 3, Ciudad",
    oficina: "Administración",
    familiares: [
      {
        id: 4,
        nombre: "José",
        apellido: "Sánchez",
        edad: 70,
        direccion: "Boulevard 3, Ciudad",
        relacion: "papa",
        trabajadorId: 3,
        observacion: "Jubilado",
        //createdAt: new Date("2023-03-01"),
        //updatedAt: new Date("2023-03-15"),
      },
      {
        id: 5,
        nombre: "Marta",
        apellido: "Sánchez",
        edad: 68,
        direccion: "Boulevard 3, Ciudad",
        relacion: "mama",
        trabajadorId: 3,
        observacion: "Jubilada",
        //createdAt: new Date("2023-03-01"),
        //updatedAt: new Date("2023-03-15"),
      },
    ],
    //createdAt: new Date("2023-02-01"),
    //updatedAt: new Date("2023-03-10"),
  },
  {
    id: 4,
    nombre: "Laura",
    apellido: "Ramírez",
    cedula: "99887766",
    edad: 28,
    direccion: "Calle 4, Ciudad",
    oficina: "RRHH",
    familiares: [],  // Sin familiares
    //createdAt: new Date("2023-03-20"),
    //updatedAt: new Date("2023-04-01"),
  },
  {
    id: 5,
    nombre: "Pedro",
    apellido: "Gómez",
    cedula: "55667788",
    edad: 45,
    direccion: "Calle 5, Ciudad",
    oficina: "Tecnología",
    familiares: [
      {
        id: 6,
        nombre: "Lucía",
        apellido: "Gómez",
        edad: 20,
        direccion: "Calle 5, Ciudad",
        relacion: "hija",
        trabajadorId: 5,
        observacion: "Universitaria",
        //createdAt: new Date("2023-04-10"),
        //updatedAt: new Date("2023-04-15"),
      },
    ],
    //createdAt: new Date("2023-04-01"),
    //updatedAt: new Date("2023-04-20"),
  },
];


/*********************************************************************************************************/
 
