import { getMongoConnectionString } from '@project/util/util-core';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {

  return {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('db.user'),
          password: config.get<string>('db.password'),
          port: config.get<string>('db.port'),
          host: config.get<string>('db.hostt'),
          databaseName: config.get<string>(`db.name`),
          authDatabase: config.get<string>(`db.authBase`),
        })
      }
    },
    inject: [ConfigService]
  }
}
