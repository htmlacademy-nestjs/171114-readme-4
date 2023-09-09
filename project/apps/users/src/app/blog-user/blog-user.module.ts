import { Module } from '@nestjs/common';
import { BlogUserController } from './blog-user.controller';
import { BlogUserService } from './blog-user.service';
import { BlogUserRepositoryModule } from 'libs/repositories/user-repository/src';

@Module({
  imports: [
    BlogUserRepositoryModule
  ],
  controllers: [BlogUserController],
  providers: [BlogUserService],
})
export class BlogUserModule {}
