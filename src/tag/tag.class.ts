import { InputType, Field, Int } from "@nestjs/graphql";

@InputType({ description: 'Tag RO' })
export class TagRO {

  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  tag: string;

}