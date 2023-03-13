import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkshopDocument } from '../../interfaces/workshop.interface';
import { Workshop, WorkshopDocument } from './schemas/workshop.schema';
import { Types } from 'mongoose';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<WorkshopDocument>,
  ) {}

  async getWorkshop(objectId): Promise<IWorkshopDocument> {
    return this.workshopModel.findById(new Types.ObjectId(objectId)).exec();
  }

  async createWorkshop(
    workshop: IWorkshopDocument,
  ): Promise<IWorkshopDocument> {
    return this.workshopModel.create(workshop);
  }

  async findAll(): Promise<WorkshopDocument[]> {
    return this.workshopModel.find().exec();
  }

  async deleteMany(workshopDocuments: IWorkshopDocument[]) {
    return await this.workshopModel.deleteMany({ _id: workshopDocuments });
  }

  async deleteOne(_id: string) {
    return await this.workshopModel.deleteOne({ _id });
  }

  async updateWorkshopName(_id: any, name: any): Promise<IWorkshopDocument> {
    return await this.workshopModel.findByIdAndUpdate<IWorkshopDocument>(
      _id,
      { name },
      { returnDocument: 'before' },
    );
  }

  async updateWorkshopHtml(_id: any, html: string): Promise<IWorkshopDocument> {
    return await this.workshopModel.findByIdAndUpdate<IWorkshopDocument>(
      _id,
      { html },
      { returnDocument: 'after' },
    );
  }
}
