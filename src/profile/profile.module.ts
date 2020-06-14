import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import {UserEntity} from "../user/user.entity";
import {ProfileEntity} from "./profile.entity";
import {AuthMiddleware} from "../user/auth.middleware";
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

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'profiles/:username/follow', method: RequestMethod.ALL});
  }
}
