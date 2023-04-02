import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopDocument, WorkshopDocumentSchema } from './schemas/workshop-document.schema';
import { WorkshopController } from './workshop-document.controller';
import { WorkshopDocumentService } from './workshop-document.service';

@Module({
  imports: [MongooseModule.forFeature([
      { name: WorkshopDocument.name, schema: WorkshopDocumentSchema }
    ])
  ],
  controllers: [WorkshopController],
  providers: [WorkshopDocumentService]
})
export class WorkshopModule {}
