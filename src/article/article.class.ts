import { UserData } from '../user/user.class';
import { ArticleEntity } from './article.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Article model' })
export class Comment {
  @Field({ nullable: false })
  body: string;
}

@ObjectType({ description: 'Article data' })
export class ArticleData {
  @Field({ nullable: false })
  slug: string;
  @Field({ nullable: false })
  title: string;
  @Field({ nullable: false })
  description: string;
  @Field({ nullable: true })
  body?: string;
  @Field(() => [String],{ nullable: 'itemsAndList' })
  tagList?: string[];
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  favorited?: boolean;
  @Field({ nullable: true })
  favoritesCount?: number;
  @Field(() => UserData, { nullable: true })
  author?: UserData;
}

@ObjectType({ description: 'Comment RO' })
export class CommentsRO {
  @Field(() => [Comment],{ nullable: false })
  comments: Comment[];
}

@ObjectType({ description: 'Article RO' })
export class ArticleRO {
  @Field(() => ArticleEntity)
  article: ArticleEntity;
}

@ObjectType({ description: 'Articles RO' })
export class ArticlesRO {
  @Field(() => [ArticleEntity])
  articles: ArticleEntity[];
  @Field({ nullable: false })
  articlesCount: number;
}

