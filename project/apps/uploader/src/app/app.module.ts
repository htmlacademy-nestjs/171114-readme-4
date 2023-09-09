import { Module } from '@nestjs/common';
import { ConfigUploaderModule, getMongooseOptions } from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
