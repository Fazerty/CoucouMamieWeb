import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.class';
import { User } from '../user/user.decorator';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

@Resolver('Profile')
export class ProfileResolver {

  constructor(private readonly profileService: ProfileService) {}

  @Query(()=> ProfileRO)
  async getProfile(@User('id') userId: number, @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    return await this.profileService.findProfile(userId, username);
  }

  @Mutation(()=> ProfileRO)
  async follow(@User('email') email: string, @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    return await this.profileService.follow(email, username);
  }

  @Mutation(()=> ProfileRO)
  async unFollow(@User('id') userId: number,  @Args('username', { type: () => String }) username: string): Promise<ProfileRO> {
    return await this.profileService.unFollow(userId, username);
  }

}
