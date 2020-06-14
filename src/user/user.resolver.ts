import { UserService } from './user.service';
import { UserRO } from './user.class';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
// import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { UserEntity } from './user.entity';
import { DeleteResult } from 'typeorm';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {

  constructor(private readonly userService: UserService) { }

  @Query(()=> UserRO)
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Mutation(()=> UserEntity)
  async update(@User('id') userId: number, @Args('user', { type: () => UpdateUserDto }) userData: UpdateUserDto): Promise<UserEntity> {
    return await this.userService.update(userId, userData);
  }

  // @UsePipes(new ValidationPipe())
  @Mutation(()=> UserRO)
  async create(@Args('user', { type: () => CreateUserDto }) userData: CreateUserDto): Promise<UserRO> {
    return this.userService.create(userData);
  }

  @Mutation(()=> String)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async delete(@Args('slug', { type: () => String }) slug: string): Promise<DeleteResult> {
    const result: DeleteResult = await await this.userService.delete(slug);
    return result.raw;
  }

  // @UsePipes(new ValidationPipe())
  @Mutation(()=> UserRO)
  async login(@Args('user', { type: () => LoginUserDto }) loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    return { user }
  }
}
