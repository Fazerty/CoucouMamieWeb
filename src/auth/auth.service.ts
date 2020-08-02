import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) { }

  async validate({ id }): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw Error('Authenticate validation error');
    }
    return user;
  }
}
