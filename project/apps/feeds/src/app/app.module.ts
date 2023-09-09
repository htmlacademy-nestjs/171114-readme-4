import { Module } from '@nestjs/common';
import { ConfigFeedsModule } from '../../../../libs/config/config-feeds/src';
import { FeedModule } from './feed/feed.module';
import { PostRepositoryModule } from '../../../../libs/repositories/post-repository/src';
import { BlogUserRepositoryModule } from 'libs/repositories/user-repository/src/lib/blog-user-repository.module';

@Module({
  imports: [
    ConfigFeedsModule,
    FeedModule,
    PostRepositoryModule,
    BlogUserRepositoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
