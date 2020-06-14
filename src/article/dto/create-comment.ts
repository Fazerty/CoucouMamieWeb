
import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create comment model' })
export class CreateCommentDto {

  @Field(() => String)
  readonly body: string;
}