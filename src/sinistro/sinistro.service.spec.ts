import { Test, TestingModule } from '@nestjs/testing';
import { SinistroService } from './sinistro.service';

describe('SinistroService', () => {
  let service: SinistroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinistroService],
    }).compile();

    service = module.get<SinistroService>(SinistroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
