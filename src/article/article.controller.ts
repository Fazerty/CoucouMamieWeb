import { Get, Post, Body, Put, Delete, Query, Param, Controller } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, CreateCommentDto } from './dto';
import { ArticlesRO, ArticleRO } from './article.class';
import { CommentsRO } from './article.class';
import { User } from '../user/user.decorator';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './article.entity';
import { DeleteResult } from 'typeorm';
import { QueryDto } from './dto/query.dto';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles.' })
  @Get()
  async findAll(@Query() query: QueryDto): Promise<ArticlesRO> {
    return await this.articleService.findAll(query);
  }


  @ApiOperation({ summary: 'Get article feed' })
  @ApiResponse({ status: 200, description: 'Return article feed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('feed')
  async getFeed(@User('id') userId: number, @Query() query: {
    limit: number;
    offset: number;
  }): Promise<ArticlesRO> {
    return await this.articleService.findFeed(userId, query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<ArticleRO> {
    return await this.articleService.findOne({ slug });
  }

  @Get(':slug/comments')
  async findComments(@Param('slug') slug: string): Promise<CommentsRO> {
    return await this.articleService.findComments(slug);
  }

  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@User('id') userId: number, @Body('article') articleData: CreateArticleDto): Promise<ArticleEntity> {
    return this.articleService.create(userId, articleData);
  }

  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':slug')
  async update(@Param() params: unknown, @Body('article') articleData: CreateArticleDto): Promise<ArticleRO> {
    // Todo: update slug also when title gets changed
    return this.articleService.update((params as any).slug, articleData);
  }

  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug')
  async delete(@Param() params: unknown): Promise<DeleteResult> {
    return this.articleService.delete((params as any).slug);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':slug/comments')
  async createComment(@Param('slug') slug: string, @Body('comment') commentData: CreateCommentDto): Promise<ArticleRO> {
    return await this.articleService.addComment(slug, commentData);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 201, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug/comments/:id')
  async deleteComment(@Param() params: unknown): Promise<ArticleRO> {
    const { slug, id } = params as any;
    return await this.articleService.deleteComment(slug, id);
  }

  @ApiOperation({ summary: 'Favorite article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully favorited.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':slug/favorite')
  async favorite(@User('id') userId: number, @Param('slug') slug: string): Promise<ArticleRO> {
    return await this.articleService.favorite(userId, slug);
  }

  @ApiOperation({ summary: 'Unfavorite article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully unfavorited.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug/favorite')
  async unFavorite(@User('id') userId: number, @Param('slug') slug: string): Promise<ArticleRO> {
    return await this.articleService.unFavorite(userId, slug);
  }

}