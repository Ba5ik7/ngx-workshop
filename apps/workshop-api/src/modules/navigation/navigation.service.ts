import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IWorkshopDocument } from '../../interfaces/workshop-document.interface';
import { WorkshopDocumentService } from '../workshop-document/workshop-document.service';
import {
  IWorkshopDocumentIdentifier,
  IWorkshop,
} from '../../interfaces/workshop.interface';
import { ISection } from '../../interfaces/section.interface';
import { Workshop, TWorkshopDocument, toSpinalCase } from './schemas/workshop.schema';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @InjectModel(Workshop.name) private workshopModel: Model<TWorkshopDocument>,
    private workshopDocumentService: WorkshopDocumentService,
  ) {}

  async findAllSections(): Promise<{ [key: string]: ISection }> {
    const sections = await this.sectionModel.find().exec();
    const sectionFormatToObject = sections.reduce(
      (acc, cur) => ({ ...acc, [cur._id]: cur }),
      {},
    );
    return Promise.resolve(sectionFormatToObject);
  }

  async findAllWorkshopsInSection(section: string): Promise<IWorkshop[]> {
    return this.workshopModel.where('sectionId').equals(section);
  }

  async createWorkshop(workshop: IWorkshop): Promise<IWorkshop> {
    const newWorkshop: IWorkshop = await this.workshopModel.create(workshop);
    const workshopDocument: IWorkshopDocument =
      await this.workshopDocumentService.createWorkshopDocument({ workshopGroupId: newWorkshop.workshopDocumentGroupId });
    const updatedWorkshop =
      await this.workshopModel.findByIdAndUpdate<IWorkshop>(
        newWorkshop._id,
        {
          workshopDocuments: [
            { _id: workshopDocument._id, name: workshopDocument.name, sortId: workshop.sortId },
          ],
          workshopDocumentsLastUpdated: Date.now(),
        },
        { returnDocument: 'after' },
      );
    return updatedWorkshop;
  }

  async editWorkshopNameAndSummary(workshop: IWorkshop): Promise<IWorkshop> {
    const { workshopDocumentGroupId } = await this.workshopModel.findOne({ _id: workshop._id });
    const newWorkshopDocumentGroupId = toSpinalCase(workshop.name);
    const updateStatus = 
      await this.workshopDocumentService.updateWorkshopDocumentsByWorkshopGroupId(workshopDocumentGroupId, newWorkshopDocumentGroupId);
    if (updateStatus) {
      const updatedWorkshop =
        await this.workshopModel.findByIdAndUpdate<IWorkshop>(
          workshop._id,
          {
            name: workshop.name,
            summary: workshop.summary,
            workshopDocumentGroupId: newWorkshopDocumentGroupId,
          },
          { returnDocument: 'after' },
        );
      return updatedWorkshop;
    }
    return null;
  }

  async deleteWorkshopAndWorkshopDocuments(
    _id: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const workshopToDelete = await this.workshopModel.findOne({ _id });
    if (workshopToDelete.workshopDocuments.length > 0) {
      await this.workshopDocumentService.deleteMany(workshopToDelete.workshopDocuments);
    }
    return await this.workshopModel.deleteOne({ _id });
  }

  async sortWorkshops(workshops: IWorkshop[]): Promise<any> {
    const newWorkshops = [];
    await Promise.all(
      workshops.map(async (workshop) => {
        const newWorkshop =
          await this.workshopModel.findByIdAndUpdate<IWorkshop>(
            workshop._id,
            { sortId: workshop.sortId },
            { returnDocument: 'after' },
          );
        newWorkshops.push(newWorkshop);
      }),
    );
    return newWorkshops;
  }

  async createPage(page: IWorkshopDocument, workshopGroupId: string): Promise<IWorkshop> {
    const workshop: IWorkshopDocument =
      await this.workshopDocumentService.createWorkshopDocument(page);
    const updatedWorkshop =
      await this.workshopModel.findByIdAndUpdate<IWorkshop>(
        workshopGroupId,
        {
          $push: {
            workshopDocuments: {
              _id: workshop._id,
              name: workshop.name,
              sortId: workshop.sortId,
            },
          },
          workshopDocumentsLastUpdated: Date.now(),
        },
        { returnDocument: 'after' },
      );
    return updatedWorkshop;
  }

  async deletePageAndUpdateWorkshop(
    _id: string,
    workshopIdToUpdate: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    await this.workshopModel.findByIdAndUpdate<IWorkshop>(workshopIdToUpdate, {
      $pull: { workshopDocuments: { _id: new Types.ObjectId(_id) } },
      workshopDocumentsLastUpdated: Date.now(),
    });
    return await this.workshopDocumentService.deleteOne(_id);
  }

  async editPageNameUpdateWorkshop({
    _id,
    name,
    workshopGroupId,
  }: IWorkshopDocument): Promise<IWorkshop> {
    const oldWorkshop = await this.workshopDocumentService.updateWorkshopName(
      _id,
      name,
    );
    const id = new Types.ObjectId(_id);
    const newWorkshopDocument = {
      _id: id,
      name,
      sortId: oldWorkshop.sortId,
    };
    const oldWorkshopDocument = {
      _id: id,
      name: oldWorkshop.name,
      sortId: oldWorkshop.sortId,
    };
    const pagesWorkshopId = this.workshopModel.find({workshopDocumentGroupId: workshopGroupId}).select('_id').exec();
    return await this.workshopModel.findByIdAndUpdate<IWorkshop>(
      pagesWorkshopId,
      { $set: { 'workshopDocuments.$[elem]': newWorkshopDocument } },
      {
        arrayFilters: [{ elem: { $eq: oldWorkshopDocument } }],
        multi: true,
        returnDocument: 'after',
      },
    );
  }

  async sortPages(
    pages: IWorkshopDocumentIdentifier[],
    workshopId: string,
  ): Promise<IWorkshop> {
    return await this.workshopModel.findByIdAndUpdate<IWorkshop>(
      workshopId,
      {
        workshopDocuments: pages,
        workshopDocumentsLastUpdated: Date.now(),
      },
      { returnDocument: 'after' },
    );
  }
}
