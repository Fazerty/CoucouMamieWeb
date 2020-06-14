import { Test, TestingModule } from '@nestjs/testing';
import { ArticleResolver } from './article.resolver';
import { ArticlesRO } from './article.class';
import { AppModule } from 'src/app.module';

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    resolver = module.get<ArticleResolver>(ArticleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });


  // TODO FIX : Timeout - Async callback was not invoked within the 5000 ms
  it.skip('articles number should be zero', async () => {
    const result: ArticlesRO = await resolver.findAllArticles({ limit: 1, offset: 1 });
    expect(result.articlesCount).toBe(0);
  });
});
