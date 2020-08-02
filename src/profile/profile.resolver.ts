import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.class';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserEntity } from 'src/user/user.entity';
import { GqlUser } from 'src/shared/decorators/decorators';

@Resolver('Profile')
export class ProfileResolver {

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly profileService: ProfileService) { }

  @Query(() => ProfileRO)
  async getProfile(@GqlUser() user: UserEntity, @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    this.logger.info("getting user profile")
    if (!user.id) {
      throw new AuthenticationError("not authentificate")
    }
    return await this.profileService.findProfile(user.id, username);
  }

  @Mutation(() => ProfileRO)
  async followUser(@GqlUser() user: UserEntity, @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    return await this.profileService.follow(user.email, username);
  }

  @Mutation(() => ProfileRO)
  async unFollowUser(@GqlUser() user: UserEntity, @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    return await this.profileService.unFollow(user.id, username);
  }

}
