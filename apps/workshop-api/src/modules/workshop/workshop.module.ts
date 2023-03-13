import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workshop, WorkshopSchema } from './schemas/workshop.schema';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  imports: [MongooseModule.forFeature([
      { name: Workshop.name, schema: WorkshopSchema }
    ])
  ],
  controllers: [WorkshopController],
  providers: [WorkshopService]
})
export class WorkshopModule {}
