

// producto.dto.ts
import { IsString, IsNotEmpty, IsInt, IsOptional, IsPositive , MaxLength, MinLength , } from 'class-validator';

export class CreateProductoDto {
  @IsOptional()
  @MinLength(1)
  @IsString()
  descripcion: string;

  @MinLength(1)
  @IsString()
  @IsOptional()
  codigo?: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsInt()
  categoriaId: number;

  @MinLength(1)
  @IsString()
  tipo: string;
}


export class AddStockDto{
  @IsInt()
  stock: number;

  @MinLength(1)
  @IsString()
  tipo: string;

  @IsPositive()
  @IsInt()
  valor: number;
}

export class SubStockDto{

  @IsInt()
  stock: number;

  @MinLength(1)
  @IsString()
  tipo: string;
  
  @IsPositive()
  @IsInt()
  valor: number;

  @IsOptional()
  @IsString()
  descripcion: string;
}


export class CreateCategoriaDto {
	@IsNotEmpty()
    @MinLength(1)
	@IsString()
    name: string;

    @MinLength(1)
    @IsString()
    tipo: string;
}
 



