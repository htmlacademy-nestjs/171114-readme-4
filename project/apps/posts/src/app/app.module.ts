import { Module } from '@nestjs/common';
import { ConfigPostsModule } from '@project/config/config-posts';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { NotifyModule } from './notify/notify.module';
import { PostRepositoryModule } from '@project/repositories/post-repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { DEFAULT_OPTION_SPACE } from './notify/notify.constant';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigPostsModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(DEFAULT_OPTION_SPACE)
    ),
    PostRepositoryModule,
    PostModule, CommentModule,
    LikeModule, NotifyModule,
    BlogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
