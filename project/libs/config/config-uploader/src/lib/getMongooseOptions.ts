import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          port: config.get<string>('application.db.port')
        })
      }
    },
    inject: [ConfigService]
  }
}
