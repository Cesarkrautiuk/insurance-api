import { Test, TestingModule } from '@nestjs/testing';
import { SinistroController } from './sinistro.controller';
import { SinistroService } from './sinistro.service';

describe('SinistroController', () => {
  let controller: SinistroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinistroController],
      providers: [SinistroService],
    }).compile();

    controller = module.get<SinistroController>(SinistroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
