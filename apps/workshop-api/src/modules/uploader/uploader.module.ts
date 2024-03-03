import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from '../../providers/cloudinary.provider';

@Module({
  imports: [
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [UploaderController],
})
export class UploaderModule {}
