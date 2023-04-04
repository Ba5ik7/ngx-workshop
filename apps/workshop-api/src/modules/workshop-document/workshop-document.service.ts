import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWorkshopDocument } from '../../interfaces/workshop-document.interface';
import { WorkshopDocument, TWorkshopDocument } from './schemas/workshop-document.schema';
import { Types } from 'mongoose';
import { IWorkshopDocumentIdentifier } from '../../interfaces/workshop.interface';

@Injectable()
export class WorkshopDocumentService {
  constructor(
    @InjectModel(WorkshopDocument.name) private workshopDocumentModel: Model<TWorkshopDocument>,
  ) {}

  async getWorkshop(objectId): Promise<IWorkshopDocument> {
    return this.workshopDocumentModel.findById(new Types.ObjectId(objectId)).exec();
  }

  async getWorkshopDocumentsByWorkshopGroupId(workshopGroupId: string): Promise<IWorkshopDocument[]> {
    return this.workshopDocumentModel.find({ workshopGroupId }).exec();
  }

  async updateWorkshopDocumentsByWorkshopGroupId(workshopGroupId: string, newWorkshopGroupId: string): Promise<{ acknowledged: boolean }> {
    return this.workshopDocumentModel.updateMany({ workshopGroupId }, { workshopGroupId: newWorkshopGroupId }).exec();
  }

  async createWorkshopDocument(
    workshop: Partial<IWorkshopDocument>,
  ): Promise<IWorkshopDocument> {
    return this.workshopDocumentModel.create(workshop);
  }

  async findAll(): Promise<IWorkshopDocument[]> {
    return this.workshopDocumentModel.find().exec();
  }

  async deleteMany(workshopDocuments: IWorkshopDocument[] | IWorkshopDocumentIdentifier[]) {
    return await this.workshopDocumentModel.deleteMany({ _id: workshopDocuments });
  }

  async deleteOne(_id: string) {
    return await this.workshopDocumentModel.deleteOne({ _id });
  }

  async updateWorkshopName(_id: any, name: any): Promise<IWorkshopDocument> {
    return await this.workshopDocumentModel.findByIdAndUpdate<IWorkshopDocument>(
      _id,
      { name },
      { returnDocument: 'before' },
    );
  }

  async updateWorkshopHtml(_id: any, html: string): Promise<IWorkshopDocument> {
    return await this.workshopDocumentModel.findByIdAndUpdate<IWorkshopDocument>(
      _id,
      { html },
      { returnDocument: 'after' },
    );
  }
}
