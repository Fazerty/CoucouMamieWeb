import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { ArticleService } from './article.service';
import { UserModule } from '../user/user.module';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, CommentEntity, UserEntity, ProfileEntity]), UserModule],
  providers: [ArticleService, ArticleResolver],
  controllers: []
})
export class ArticleModule implements NestModule {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer): void {
    //
  }
}
