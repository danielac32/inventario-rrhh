import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto,CreateCategoriaDto,CreateTrabajadorDto } from './create-inv.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}

export class UpdateTrabajadorDto extends PartialType(CreateTrabajadorDto) {}