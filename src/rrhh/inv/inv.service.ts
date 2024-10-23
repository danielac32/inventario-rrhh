import { Injectable } from '@nestjs/common';
import { CreateInvDto } from './dto/create-inv.dto';
import { UpdateInvDto } from './dto/update-inv.dto';

@Injectable()
export class InvService {
  create(createInvDto: CreateInvDto) {
    return 'This action adds a new inv';
  }

  findAll() {
    return `This action returns all inv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inv`;
  }

  update(id: number, updateInvDto: UpdateInvDto) {
    return `This action updates a #${id} inv`;
  }

  remove(id: number) {
    return `This action removes a #${id} inv`;
  }
}
