import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { ArticleService } from './article.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, CommentEntity, UserEntity, ProfileEntity]), UserModule],
  providers: [ArticleService, ArticleResolver],
  controllers: [
    ArticleController
  ]
})
export class ArticleModule implements NestModule {

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'articles/feed', method: RequestMethod.GET},
        {path: 'articles', method: RequestMethod.POST},
        {path: 'articles/:slug', method: RequestMethod.DELETE},
        {path: 'articles/:slug', method: RequestMethod.PUT},
        {path: 'articles/:slug/comments', method: RequestMethod.POST},
        {path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE},
        {path: 'articles/:slug/favorite', method: RequestMethod.POST},
        {path: 'articles/:slug/favorite', method: RequestMethod.DELETE});
  }
}
