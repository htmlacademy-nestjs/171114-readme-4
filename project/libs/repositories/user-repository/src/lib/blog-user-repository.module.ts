import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from '../../../../../apps/users/src/app/blog-user/blog-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  providers: [BlogUserRepository],
  exports: [BlogUserRepository]
})
export class BlogUserRepositoryModule {}
