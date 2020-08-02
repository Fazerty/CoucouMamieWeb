import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.class';

import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import { GqlUser } from 'src/shared/decorators/decorators';
import { UserEntity } from 'src/user/user.entity';

@ApiBearerAuth()
@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(@GqlUser() user: UserEntity, @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.findProfile(user.id, username);
  }

  @Post(':username/follow')
  async follow(@GqlUser() user: UserEntity, @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.follow(user.email, username);
  }

  @Delete(':username/follow')
  async unFollow(@GqlUser() user: UserEntity,  @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.unFollow(user.id, username);
  }

}