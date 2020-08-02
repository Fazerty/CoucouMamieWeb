import { IsEmail, MinLength } from 'class-validator';


export class SignUpInput {
  email: string;
  password: string;
}

export class SignUpInputDto extends SignUpInput {
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  readonly password: string;
}

