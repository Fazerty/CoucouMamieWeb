import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { TagResolver } from './tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService, TagResolver],
  controllers: [  ],
  exports: []
})
export class TagModule implements NestModule {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public configure(_consumer: MiddlewareConsumer): void {
    //
  }
}
