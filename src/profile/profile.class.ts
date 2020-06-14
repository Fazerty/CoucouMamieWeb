import { ObjectType, Field } from "@nestjs/graphql";


@ObjectType({ description: 'Profile model' })
export class ProfileData {
  @Field({ nullable: false })
  username: string;
  @Field({ nullable: false })
  bio: string;
  @Field({ nullable: true })
  image?: string;
  @Field({ nullable: true })
  following?: boolean;
}

@ObjectType({ description: 'Profile model' })
export class ProfileRO {
  @Field(() => ProfileData)
  profile: ProfileData;
}