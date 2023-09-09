import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_POSTS_FILE_PATH } from './config-posts.constant';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_POSTS_FILE_PATH
    }),
  ]
})
export class ConfigPostsModule {}
