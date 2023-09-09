import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepositoryModule } from '../../../../../libs/repositories/post-repository/src';
import { JwtAccessStrategy } from '@project/util/util-core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigPostsModule } from '@project/config/config-posts';

@Module({
  imports: [
    PostRepositoryModule,
    ConfigPostsModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secretOrPrivateKey: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  controllers: [PostController],
  providers: [PostService, JwtAccessStrategy],
})
export class PostModule {}
