import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/mongo.config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';
import { ENV_FEEDS_FILE_PATH } from './config-feeds.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_FEEDS_FILE_PATH
    }),
  ]
})
export class ConfigFeedsModule {}
