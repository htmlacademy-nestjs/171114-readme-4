import { Module } from '@nestjs/common';
import { LikesController } from './like.controller';
import { LikesService } from './like.service';
import { LikeRepository } from '../../../../../libs/repositories/post-repository/src/lib/like.repository';
import { PostModule } from '../post/post.module';
import { JwtAccessStrategy } from '@project/util/util-core';
import { PostRepositoryModule } from '@project/repositories/post-repository';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PostModule,
    PostRepositoryModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secretOrPrivateKey: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository, JwtAccessStrategy],
  exports: [LikeRepository],
})
export class LikeModule {}
