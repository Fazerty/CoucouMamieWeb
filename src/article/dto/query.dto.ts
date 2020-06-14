
import { Field, InputType, Int } from '@nestjs/graphql';
import { TagRO } from 'src/tag/tag.class';

@InputType({ description: 'Query' })
export class QueryDto {

  @Field(() => TagRO, { nullable: true })
  tag?: TagRO;

  @Field(() => String, { nullable: true })
  author?: string;

  @Field({ nullable: true })
  favorited?: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;
}