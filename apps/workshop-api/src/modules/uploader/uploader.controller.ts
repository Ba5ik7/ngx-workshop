import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('uploader')
export class UploaderController {

  constructor(private cloudinaryService: CloudinaryService) {}

  @Roles(Role.Admin)
  @Post('image-upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(file);
    console.log(result);
    return result.secure_url;
    return { message: 'File uploaded successfully', fileName: file.originalname };
  }
}
