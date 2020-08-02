import { UserService } from './user.service';
import { UserRO } from './user.class';
import { CreateUserDto, UpdateUserDto } from './dto';

import { UserEntity } from './user.entity';
import { DeleteResult } from 'typeorm';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlUser } from 'src/shared/decorators/decorators';

@Resolver('User')
export class UserResolver {

  constructor(private readonly userService: UserService) { }

  @Query(()=> UserRO)
  async findCurrentUser(@GqlUser() user: UserEntity): Promise<UserRO> {
    return await this.userService.findByEmail(user.email);
  }

  @Mutation(()=> UserEntity)
  async updateCurrentUser(@GqlUser() user: UserEntity, @Args('user', { type: () => UpdateUserDto }) userData: UpdateUserDto): Promise<UserEntity> {
    return await this.userService.update(user.id, userData);
  }

  // @UsePipes(new ValidationPipe())
  @Mutation(()=> UserRO)
  async createUser(@Args('user', { type: () => CreateUserDto }) userData: CreateUserDto): Promise<UserRO> {
    return this.userService.create(userData);
  }

  @Mutation(()=> String)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteUser(@Args('slug', { type: () => String }) slug: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.userService.delete(slug);
    return result.raw;
  }

}
