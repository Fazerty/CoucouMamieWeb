import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ResGql } from '../shared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInputDto } from './sign-up-input.dto';

export class LoginInput {
  email: string;
  password: string;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  @Mutation()
  async login(
    @Args('loginInput') { email, password }: LoginInput,
    @ResGql() res: Response,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }

  @Mutation()
  async signup(
    @Args('signUpInput') signUpInputDto: SignUpInputDto,
    @ResGql() res: Response,
  ): Promise<UserEntity> {
    const emailExists = await this.userRepository.findOne({
      email: signUpInputDto.email,
    });
    if (emailExists) {
      throw Error('Email is already in use');
    }
    const password = await bcryptjs.hash(signUpInputDto.password, 10);

    const user = await this.userRepository.save({
      ...signUpInputDto,
      password,
    });

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }
}
