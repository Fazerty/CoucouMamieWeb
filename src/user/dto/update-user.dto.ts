
import { Field, InputType } from '@nestjs/graphql';
@InputType({ description: 'Update user model' })
export class UpdateUserDto {

  @Field({ nullable: false })
  readonly username: string;

  @Field({ nullable: false })
  readonly email: string;

  @Field({ nullable: false })
  readonly bio: string;

  @Field({ nullable: false })
  readonly image: string;
}