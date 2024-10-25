
import { ApiProperty } from '@nestjs/swagger';
// producto.dto.ts
import { IsString, IsNotEmpty, IsInt, IsOptional, IsPositive , MaxLength, MinLength , } from 'class-validator';

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
  @IsPositive()
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
  valor: number;
}

export class SubStockDto{
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
  valor: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion: string;
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
  carfgo: string;

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





