import { ArticleService } from './article.service';
import { CreateArticleDto, CreateCommentDto } from './dto';
import { ArticlesRO, ArticleRO } from './article.class';
import { CommentsRO } from './article.class';
import { User } from '../user/user.decorator';


import { ArticleEntity } from './article.entity';
import { DeleteResult } from 'typeorm';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QueryDto } from './dto/query.dto';

@Resolver('Article')
export class ArticleResolver {

  constructor(private readonly articleService: ArticleService) { }

  // @ApiOperation({ summary: 'Get all articles' })
  // @ApiResponse({ status: 200, description: 'Return all articles.' })
  @Query(() => ArticlesRO)
  async findAllArticles(@Args('query', { type: () => QueryDto }) query: QueryDto): Promise<ArticlesRO> {
    return await this.articleService.findAll(query);
  }


  // @ApiOperation({ summary: 'Get article feed' })
  // @ApiResponse({ status: 200, description: 'Return article feed.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Query(() => ArticlesRO)
  async getFeed(@User('id') userId: number, @Args('query', { type: () => QueryDto }) query: QueryDto): Promise<ArticlesRO> {
    return await this.articleService.findFeed(userId, query);
  }

  @Query(() => ArticleRO)
  async findOne(@Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.findOne({ slug });
  }

  @Query(() => CommentsRO)
  async findComments(@Args('slug', { type: () => String }) slug: string): Promise<CommentsRO> {
    return await this.articleService.findComments(slug);
  }

  // @ApiOperation({ summary: 'Create article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => ArticleEntity)
  async create(@User('id') userId: number, @Args('articleData', { type: () => CreateArticleDto }) articleData: CreateArticleDto): Promise<ArticleEntity> {
    return this.articleService.create(userId, articleData);
  }

  // @ApiOperation({ summary: 'Update article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully updated.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Mutation(':slug')
  @Mutation(() => ArticleRO)
  async update(@Args('slug', { type: () => String }) slug: string, @Args('articleData', { type: () => CreateArticleDto }) articleData: CreateArticleDto): Promise<ArticleRO> {
    // Todo: update slug also when title gets changed
    return this.articleService.update(slug, articleData);
  }

  // @ApiOperation({ summary: 'Delete article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully deleted.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => String)
  async delete(@Args('slug', { type: () => String }) slug: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.articleService.delete(slug);
    return result.raw;
  }

  // @ApiOperation({ summary: 'Create comment' })
  // @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => ArticleRO)
  async createComment(@Args('slug', { type: () => String }) slug: string, @Args('commentData', { type: () => CreateCommentDto }) commentData: CreateCommentDto): Promise<ArticleRO> {
    return await this.articleService.addComment(slug, commentData);
  }

  // @ApiOperation({ summary: 'Delete comment' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully deleted.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => ArticleRO)
  async deleteComment(@Args('slug', { type: () => String }) slug: string, @Args('id', { type: () => String }) id: string): Promise<ArticleRO> {
    return await this.articleService.deleteComment(slug, id);
  }

  // @ApiOperation({ summary: 'Favorite article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully favorited.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => ArticleRO)
  async favorite(@User('id') userId: number, @Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.favorite(userId, slug);
  }

  // @ApiOperation({ summary: 'Unfavorite article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully unfavorited.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Mutation(() => ArticleRO)
  async unFavorite(@User('id') userId: number, @Args('slug', { type: () => String }) slug: string): Promise<ArticleRO> {
    return await this.articleService.unFavorite(userId, slug);
  }

}
