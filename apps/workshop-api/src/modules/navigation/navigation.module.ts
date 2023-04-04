import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { Section, SectionSchema } from './schemas/section.schema';
import { Workshop, WorkshopSchema } from './schemas/workshop.schema';
import { WorkshopDocumentService } from '../workshop-document/workshop-document.service';
import { WorkshopDocument, WorkshopDocumentSchema } from '../workshop-document/schemas/workshop-document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Workshop.name, schema: WorkshopSchema },
      { name: WorkshopDocument.name, schema: WorkshopDocumentSchema },
    ]),
  ],
  controllers: [NavigationController],
  providers: [NavigationService, WorkshopDocumentService],
})
export class NavigationModule {}
