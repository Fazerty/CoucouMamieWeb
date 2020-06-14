import { Test, TestingModule } from '@nestjs/testing';
import { TagResolver } from './tag.resolver';
import { AppModule } from 'src/app.module';

describe('TagResolver', () => {
  let resolver: TagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      // providers: [TagResolver],
    }).compile();

    resolver = module.get<TagResolver>(TagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
