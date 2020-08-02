import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import {UserEntity} from "../user/user.entity";
import {ProfileEntity} from "./profile.entity";
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity]), UserModule],
  providers: [ProfileService, ProfileResolver],
  controllers: [
    ProfileController
  ],
  exports: []
})
export class ProfileModule implements NestModule {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer): void {
    //
  }
}
