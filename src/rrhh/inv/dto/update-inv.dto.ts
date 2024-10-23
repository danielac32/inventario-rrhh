import { PartialType } from '@nestjs/swagger';
import { CreateInvDto } from './create-inv.dto';

export class UpdateInvDto extends PartialType(CreateInvDto) {}
