
import { ApiProperty } from '@nestjs/swagger';
// producto.dto.ts
import { IsString, IsNotEmpty, IsInt, IsOptional, IsPositive , MaxLength, MinLength ,ValidateNested ,IsArray} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductoDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  descripcion: string;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  @IsOptional()
  codigo?: string;

  @ApiProperty()
  @IsInt()
  /*@IsPositive()*/
  stock: number;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  categoriaId: number;
}


export class AddStockDto{

  /*@ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  tipo: string;*/
  
  /*@ApiProperty()
  @IsOptional()
  @IsString()
  observacion: string;*/

  @ApiProperty()
  @IsInt()
  stock: number;


  @ApiProperty()
  @MinLength(1)
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  cantidad: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  entregado: string;
}

export class SubStockDto{


  @ApiProperty()
  @IsInt()
  stock: number;
  
  @ApiProperty()
  @IsPositive()
  @IsInt()
  cantidad: number;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  entregado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observacion: string;
}


export class CreateCategoriaDto {
  @ApiProperty()
	@IsNotEmpty()
  @MinLength(1)
	@IsString()
  name: string;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  tipo: string;
}
 
export class CreateTrabajadorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cargo: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  edad: number;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  direccion: string;
  
  @ApiProperty()
  @MinLength(1)
  @IsString()
  oficina: string;
}




export class ProductCart {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}

export class CreateAsignacionDto {

  @ApiProperty()
  @IsInt()
  @IsOptional()
  trabajadorId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  familiarId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  otro: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  observacion: string;

  @ApiProperty()
  @MinLength(1)
  @IsString()
  tipo: string;

  @ApiProperty({ type: [ProductCart], description: 'Array of product carts' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCart)
  productos: ProductCart[];
}


export class CreateReport {

  @ApiProperty()
  @IsInt()
  @IsOptional()
  trabajadorId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  familiarId: number;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  apellido: string;
  
  @ApiProperty()
  @IsInt()
  @IsOptional()
  cedula: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  parentesco: string;


  @ApiProperty()
  @IsString()
  desde: string;

  @ApiProperty()
  @IsString()
  hasta: string;
}
