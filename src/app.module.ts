import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
// import { ProfileResolver } from './profile/profile.resolver';
import { TagModule } from './tag/tag.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
     // include: [ProfileResolver],
      autoSchemaFile: true, // path.join(process.cwd(), 'src/gql/schema.gql'),
    }
    ),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


