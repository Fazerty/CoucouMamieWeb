import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { Resolver, Query } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Resolver('Tag')
export class TagResolver {

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly tagService: TagService) {}

  @Query(()=> [TagEntity], {description: 'Find all tags'})
  async findAllTags(): Promise<TagEntity[]> {
    this.logger.info('find all tags')
    return await this.tagService.findAll();
  }

}