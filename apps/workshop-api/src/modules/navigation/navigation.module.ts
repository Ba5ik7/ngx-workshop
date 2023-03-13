import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { Section, SectionSchema } from './schemas/section.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { WorkshopService } from '../workshop/workshop.service';
import { Workshop, WorkshopSchema } from '../workshop/schemas/workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Workshop.name, schema: WorkshopSchema },
    ]),
  ],
  controllers: [NavigationController],
  providers: [NavigationService, WorkshopService],
})
export class NavigationModule {}
