import { ValidRoles } from '../../auth/interface/valid-roles';
import * as bcrypt from 'bcrypt';


import { IProducto,ICategoria,IUser,ITrabajador,IFamiliar} from '../../interface/inv-interface';
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
 
export const productos: IProducto[] = [
   {
    nombre: "Amoxicilina",
    descripcion: "Antibiótico utilizado para tratar diversas infecciones.",
    codigo: "AMOX123",
    stock: 100,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 1, // Antibióticos
  },
  {
    nombre: "Ibuprofeno",
    descripcion: "Analgésico y antiinflamatorio.",
    codigo: "IBUP456",
    stock: 200,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 2, // Analgésicos
  },
  {
    nombre: "Paracetamol",
    descripcion: "Fármaco utilizado para aliviar el dolor y reducir la fiebre.",
    codigo: "PARA789",
    stock: 150,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 5, // Antipiréticos
  },
  {
    nombre: "Ciprofloxacino",
    descripcion: "Antibiótico de amplio espectro.",
    codigo: "CIPRO123",
    stock: 120,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 1, // Antibióticos
  },
  {
    nombre: "Naproxeno",
    descripcion: "Analgésico y antiinflamatorio no esteroideo.",
    codigo: "NAPRO456",
    stock: 80,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 2, // Analgésicos
  },
  {
    nombre: "Loratadina",
    descripcion: "Antihistamínico para el tratamiento de alergias.",
    codigo: "LORA789",
    stock: 90,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 4, // Antihistamínicos
  },
  {
    nombre: "Metformina",
    descripcion: "Medicamento para controlar los niveles de azúcar en sangre.",
    codigo: "METF123",
    stock: 60,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 8, // Medicamentos para Diabetes
  },
  {
    nombre: "Atorvastatina",
    descripcion: "Medicamento utilizado para tratar el colesterol alto.",
    codigo: "ATOR456",
    stock: 70,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 9, // Medicamentos Cardiovasculares
  },
  {
    nombre: "Omeprazol",
    descripcion: "Medicamento para el tratamiento de problemas gástricos.",
    codigo: "OME123",
    stock: 130,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 7, // Otros
  },
  {
    nombre: "Furosemida",
    descripcion: "Diurético utilizado para tratar la hipertensión y edema.",
    codigo: "FURO456",
    stock: 50,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 6, // Otros
  },
  {
    nombre: "Cetirizina",
    descripcion: "Antihistamínico para el tratamiento de alergias.",
    codigo: "CETI123",
    stock: 110,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 4, // Antihistamínicos
  },
  {
    nombre: "Dexametasona",
    descripcion: "Corticoide utilizado para reducir la inflamación.",
    codigo: "DEXA456",
    stock: 75,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 6, // Otros
  },
  {
    nombre: "Clonazepam",
    descripcion: "Medicamento ansiolítico utilizado para tratar trastornos de ansiedad.",
    codigo: "CLONA789",
    stock: 45,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 3, // Antidepresivos
  },
  {
    nombre: "Sildenafil",
    descripcion: "Medicamento utilizado para tratar la disfunción eréctil.",
    codigo: "SILD123",
    stock: 30,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 6, // Otros
  },
  {
    nombre: "Levotiroxina",
    descripcion: "Hormona tiroidea utilizada para tratar el hipotiroidismo.",
    codigo: "LEVO456",
    stock: 40,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 6, // Otros
  },
  {
    nombre: "Tamsulosina",
    descripcion: "Medicamento utilizado para tratar problemas de próstata.",
    codigo: "TAMS789",
    stock: 20,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 6, // Otros
  },
  {
    nombre: "Tramadol",
    descripcion: "Analgésico utilizado para tratar el dolor moderado a severo.",
    codigo: "TRAM123",
    stock: 65,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 2, // Analgésicos
  },
  {
    nombre: "Bupropión",
    descripcion: "Antidepresivo utilizado para tratar trastornos depresivos.",
    codigo: "BUPR456",
    stock: 35,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 3, // Antidepresivos
  },
  {
    nombre: "Fentanyl",
    descripcion: "Opioide potente utilizado para tratar el dolor severo.",
    codigo: "FENT123",
    stock: 25,
    tipo: TipoProducto.MEDICAMENTOS,
    categoriaId: 2, // Analgésicos
  },
  
  {
    nombre: "Uniforme Escolar",
    descripcion: "Uniforme para estudiantes de primaria.",
    codigo: "UNIFSCH001",
    stock: 50,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 11, // Uniformes Escolares
  },
  {
    nombre: "Botas de Protección",
    descripcion: "Calzado de seguridad para trabajadores.",
    codigo: "BOTASPROT002",
    stock: 75,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 15, // Ropa de Protección
  },
  {
    nombre: "Camisa Escolar",
    descripcion: "Camisa blanca para el uniforme escolar.",
    codigo: "CAMISCH003",
    stock: 100,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 11, // Uniformes Escolares
  },
  {
    nombre: "Pantalón Escolar",
    descripcion: "Pantalón azul para el uniforme escolar.",
    codigo: "PANTSCH004",
    stock: 80,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 11, // Uniformes Escolares
  },
  {
    nombre: "Zapatos Escolares",
    descripcion: "Zapatos negros para estudiantes.",
    codigo: "ZAPESCH005",
    stock: 120,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 14, // Zapatos Escolares
  },
  {
    nombre: "Mochila Escolar",
    descripcion: "Mochila resistente para estudiantes.",
    codigo: "MOCHSCH006",
    stock: 60,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Lápiz",
    descripcion: "Lápiz grafito para escribir.",
    codigo: "LAPIZ007",
    stock: 200,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Cuaderno",
    descripcion: "Cuaderno de hojas rayadas para tomar notas.",
    codigo: "CUAD008",
    stock: 150,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Borrador",
    descripcion: "Borrador para lápiz.",
    codigo: "BORR009",
    stock: 180,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Regla",
    descripcion: "Regla de 30 cm.",
    codigo: "REGL010",
    stock: 90,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Tijeras",
    descripcion: "Tijeras para uso escolar.",
    codigo: "TIJER011",
    stock: 70,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Bolígrafo",
    descripcion: "Bolígrafo de tinta azul.",
    codigo: "BOLI012",
    stock: 250,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Marcador",
    descripcion: "Marcador permanente de color negro.",
    codigo: "MARC013",
    stock: 110,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Compás",
    descripcion: "Compás de metal para dibujar círculos.",
    codigo: "COMP014",
    stock: 40,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Calculadora",
    descripcion: "Calculadora científica.",
    codigo: "CALC015",
    stock: 30,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Zapatos de Deporte",
    descripcion: "Zapatos deportivos para educación física.",
    codigo: "ZAPDEP016",
    stock: 60,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 20, // Uniformes Deportivos
  },
  {
    nombre: "Chaqueta Escolar",
    descripcion: "Chaqueta con el logo de la escuela.",
    codigo: "CHAQ017",
    stock: 40,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 11, // Uniformes Escolares
  },
  {
    nombre: "Gomas de borrar",
    descripcion: "Gomas de borrar en diferentes colores.",
    codigo: "GOMAS018",
    stock: 150,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Cinta adhesiva",
    descripcion: "Cinta adhesiva de uso escolar.",
    codigo: "CINTA019",
    stock: 100,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
    nombre: "Portafolios",
    descripcion: "Portafolios para documentos escolares.",
    codigo: "PORTA020",
    stock: 50,
    tipo: TipoProducto.UNIFORMES,
    categoriaId: 18, // Accesorios para Uniformes
  },
  {
  nombre: "Explorador Dental",
  descripcion: "Instrumento utilizado para explorar la cavidad bucal y detectar caries o irregularidades.",
  codigo: "EXPLORDT001",
  stock: 30,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 21, // Exploradores Dentales
},
{
  nombre: "Espejo Dental",
  descripcion: "Espejo utilizado en odontología para inspeccionar la cavidad bucal.",
  codigo: "ESPEJODT002",
  stock: 30,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 22, // Espejos Dentales
},
{
  nombre: "Pinza de Extracción",
  descripcion: "Pinza utilizada para extraer dientes.",
  codigo: "PINZADT003",
  stock: 20,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 23, // Pinzas de Extracción
},
{
  nombre: "Jeringa Dental",
  descripcion: "Jeringa utilizada para administrar anestesia local en procedimientos dentales.",
  codigo: "JERINGADT004",
  stock: 15,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 24, // Jeringas Dentales
},
{
  nombre: "Material de Relleno",
  descripcion: "Material utilizado para rellenos en tratamientos dentales.",
  codigo: "RELLENODT005",
  stock: 50,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 25, // Material de Relleno
},
{
  nombre: "Impresión Dental",
  descripcion: "Material para tomar impresiones de la estructura dental.",
  codigo: "IMPRESIONDT006",
  stock: 40,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 26, // Impresiones Dentales
},
{
  nombre: "Radiografía Dental",
  descripcion: "Radiografías utilizadas para diagnósticos dentales.",
  codigo: "RADIDT007",
  stock: 40,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 27, // Radiografías Dentales
},
{
  nombre: "Equipo de Esterilización",
  descripcion: "Equipo utilizado para esterilizar instrumentos dentales.",
  codigo: "ESTERILIZADOR008",
  stock: 12,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 28, // Equipos de Esterilización
},
{
  nombre: "Protector Bucal",
  descripcion: "Protector utilizado para prevenir lesiones durante el deporte.",
  codigo: "PROTBUCAL009",
  stock: 70,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 29, // Protectores Bucales
},
{
  nombre: "Consultorio Móvil",
  descripcion: "Consultorio portátil para atención dental en ubicaciones remotas.",
  codigo: "CONSULTMOVIL010",
  stock: 5,
  tipo: TipoProducto.EQUIPOS_ODONTOLOGICOS,
  categoriaId: 30, // Consultorios Móviles
}
];
