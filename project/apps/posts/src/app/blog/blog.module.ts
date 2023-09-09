import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PostModule } from '../post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@project/util/util-core';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [PostModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule
  ],
  controllers: [BlogController],
  providers: [BlogService, JwtAccessStrategy],
})
export class BlogModule {}
