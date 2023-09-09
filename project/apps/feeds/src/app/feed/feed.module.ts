import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { PrismaModule } from '../../../../../libs/repositories/post-repository/src/lib/prisma/prisma.module';
import { PostRepositoryModule } from '../../../../../libs/repositories/post-repository/src';
import { BlogUserRepositoryModule } from 'libs/repositories/user-repository/src/lib/blog-user-repository.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: getJwtOptions,
      inject: [ConfigService],
    }),
    PrismaModule,
    PostRepositoryModule,
    BlogUserRepositoryModule
  ],
})
export class FeedModule {}
