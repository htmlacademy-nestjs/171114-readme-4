import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from '../../../../../libs/repositories/post-repository/src/lib/comment.repository';
import { JwtAccessStrategy } from '@project/util/util-core';
import { PostRepositoryModule } from '@project/repositories/post-repository';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
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
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, JwtAccessStrategy],
  exports: [CommentRepository],
})
export class CommentModule { }
