import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ENV_POSTS_FILE_PATH } from './config-posts.constant';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ jwtConfig, rabbitConfig],
      envFilePath: ENV_POSTS_FILE_PATH
    }),
  ]
})
export class ConfigPostsModule {}