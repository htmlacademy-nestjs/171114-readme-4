import { Module } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from '../../../../../apps/uploader/src/app/file/file.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema },
    ]),
  ],
  providers: [FileRepository],
  exports: [FileRepository]
})
export class UserRepositoryModule {}
