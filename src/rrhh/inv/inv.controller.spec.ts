import { Test, TestingModule } from '@nestjs/testing';
import { InvController } from './inv.controller';
import { InvService } from './inv.service';

describe('InvController', () => {
  let controller: InvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvController],
      providers: [InvService],
    }).compile();

    controller = module.get<InvController>(InvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
