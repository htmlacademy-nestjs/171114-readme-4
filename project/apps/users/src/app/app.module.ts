import { Module } from '@nestjs/common';
import {
  ConfigUsersModule,
  getMongooseOptions,
} from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { NotifyModule } from './notify/notify.module';
import { BlogUserRepositoryModule } from 'libs/repositories/user-repository/src/lib/blog-user-repository.module';
import { BlogUserModule } from './blog-user/blog-user.module';

@Module({
  imports: [
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    AuthenticationModule,
    RefreshTokenModule,
    NotifyModule,
    BlogUserModule,
    BlogUserRepositoryModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
