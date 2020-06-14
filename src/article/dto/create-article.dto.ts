import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create article model' })
export class CreateArticleDto {

  @Field(() => String)
  readonly title: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly body: string;


  @Field(() => [String])
  readonly tagList: string[];
}
