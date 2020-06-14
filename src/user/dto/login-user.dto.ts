import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType({ description: 'Login user model' })
export class LoginUserDto {

  @IsNotEmpty()
  @Field({ nullable: false })
  readonly email: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  readonly password: string;
}