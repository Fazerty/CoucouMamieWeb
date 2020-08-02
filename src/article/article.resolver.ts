import { ArticleService } from './article.service';
import { CreateArticleDto, CreateCommentDto } from './dto';
import { ArticlesRO, ArticleRO } from './article.class';
import { CommentsRO } from './article.class';

import { ArticleEntity } from './article.entity';
import { DeleteResult } from 'typeorm';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QueryDto } from './dto/query.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators/decorators';
import { UserEntity } from 'src/user/user.entity';

@Resolver('Article')
export class ArticleResolver {

  constructor(private readonly articleService: ArticleService) { }

  @Query(() => ArticlesRO, {description : 'Get all articles'})
  async findAllArticles(@Args('query', { type: () => QueryDto }) query: QueryDto): Promise<ArticlesRO> {
    console.log('hererere')
    return await this.articleService.findAll(query);
  }

  @Query(() => ArticlesRO, {description : 'Get article feed'})
  async getFeed(@GqlUser() user: UserEntity, @Args('query', { type: () => QueryDto }) query: QueryDto): Promise<ArticlesRO> {
    return await this.articleService.findFeed(user.id, query);
  }

  @Query(() => ArticleRO)
  async findOneArticle(@Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.findOne({ slug });
  }

  @Query(() => CommentsRO)
  async findComments(@Args('slug', { type: () => String }) slug: string): Promise<CommentsRO> {
    return await this.articleService.findComments(slug);
  }

  @Mutation(() => ArticleEntity, { description: 'Create article' })
  @UseGuards(GqlAuthGuard)
  async createArticle(@GqlUser() user: UserEntity, @Args('articleData', { type: () => CreateArticleDto }) articleData: CreateArticleDto): Promise<ArticleEntity> {
    return this.articleService.create(user.id, articleData);
  }

  // @Mutation(':slug')
  @Mutation(() => ArticleRO, {description : 'Update article'})
  async updateArticle(@Args('slug', { type: () => String }) slug: string, @Args('articleData', { type: () => CreateArticleDto }) articleData: CreateArticleDto): Promise<ArticleRO> {
    // Todo: update slug also when title gets changed
    return this.articleService.update(slug, articleData);
  }

  @Mutation(() => String, {description : 'Delete article'})
  async deleteArticle(@Args('slug', { type: () => String }) slug: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.articleService.delete(slug);
    return result.raw;
  }

  @Mutation(() => ArticleRO, {description : 'Create comment'})
  async createComment(@Args('slug', { type: () => String }) slug: string, @Args('commentData', { type: () => CreateCommentDto }) commentData: CreateCommentDto): Promise<ArticleRO> {
    return await this.articleService.addComment(slug, commentData);
  }

  @Mutation(() => ArticleRO, {description : 'Delete comment'})
  async deleteComment(@Args('slug', { type: () => String }) slug: string, @Args('id', { type: () => String }) id: string): Promise<ArticleRO> {
    return await this.articleService.deleteComment(slug, id);
  }

  @Mutation(() => ArticleRO, {description : 'Favorite article'})
  async favoriteArticle(@GqlUser() user: UserEntity, @Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.favorite(user.id, slug);
  }

  @Mutation(() => ArticleRO, {description : 'Unfavorite article'})
  async unFavoriteArticle(@GqlUser() user: UserEntity, @Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.unFavorite(user.id, slug);
  }

}
