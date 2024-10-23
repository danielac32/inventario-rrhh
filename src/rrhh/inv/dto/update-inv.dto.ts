import { PartialType } from '@nestjs/swagger';
import { CreateProductoDto } from './create-inv.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}



