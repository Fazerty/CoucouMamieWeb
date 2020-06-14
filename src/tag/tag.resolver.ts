import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Tag')
export class TagResolver {

  constructor(private readonly tagService: TagService) {}

  @Query(()=> [TagEntity])
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }

}