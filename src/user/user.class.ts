import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: 'User Data' })
export class UserData {
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  token: string;
  @Field({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  image?: string;

}

@ObjectType({ description: 'User RO' })
export class UserRO {
  @Field(() => UserData, { nullable: false })
  user: UserData;
}