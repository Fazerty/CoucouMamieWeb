import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType({ description: 'Create user model' })
export class CreateUserDto {

  @IsNotEmpty()
  @Field({ nullable: false })
  readonly username: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  readonly email: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  readonly password: string;
}