import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IWorkshopDocument } from '../../interfaces/workshop.interface';
import { WorkshopService } from '../workshop/workshop.service';
import {
  CategoryWorkshopDocument,
  ICategory,
} from '../../interfaces/category.interface';
import { ISection } from '../../interfaces/section.interface';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class NavigationService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private workshopService: WorkshopService,
  ) {}

  async findAllSections(): Promise<{ [key: string]: ISection }> {
    const sections = await this.sectionModel.find().exec();
    const sectionFormatToObject = sections.reduce(
      (acc, cur) => ({ ...acc, [cur._id]: cur }),
      {},
    );
    return Promise.resolve(sectionFormatToObject);
  }

  async findAllCategoriesInSection(section: string): Promise<Category[]> {
    return this.categoryModel.where('sectionId').equals(section);
  }

  async createCategory(category: ICategory): Promise<ICategory> {
    const newCategory: ICategory = await this.categoryModel.create(category);
    const workshop: IWorkshopDocument =
      await this.workshopService.createWorkshop({ id: newCategory.id });
    const updatedCategory =
      await this.categoryModel.findByIdAndUpdate<ICategory>(
        newCategory._id,
        {
          workshopDocuments: [
            { _id: workshop._id, name: workshop.name, sortId: workshop.sortId },
          ],
          workshopDocumentsLastUpdated: Date.now(),
        },
        { returnDocument: 'after' },
      );
    return updatedCategory;
  }

  async editCategoryNameAndSummary(category: ICategory): Promise<ICategory> {
    const updatedCategory =
      await this.categoryModel.findByIdAndUpdate<ICategory>(
        category._id,
        {
          name: category.name,
          summary: category.summary,
        },
        { returnDocument: 'after' },
      );
    return updatedCategory;
  }

  async deleteCategoryAndWorkshops(
    _id: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    const categoryToDelete = await this.categoryModel.findOne({ _id });
    if (categoryToDelete.workshopDocuments.length > 0) {
      await this.workshopService.deleteMany(categoryToDelete.workshopDocuments);
    }
    return await this.categoryModel.deleteOne({ _id });
  }

  async sortCategories(categories: ICategory[]): Promise<any> {
    const newCategories = [];
    await Promise.all(
      categories.map(async (category) => {
        const newCatgory =
          await this.categoryModel.findByIdAndUpdate<ICategory>(
            category._id,
            { sortId: category.sortId },
            { returnDocument: 'after' },
          );
        newCategories.push(newCatgory);
      }),
    );
    return newCategories;
  }

  async createPage(page: IWorkshopDocument): Promise<IWorkshopDocument> {
    const workshop: IWorkshopDocument =
      await this.workshopService.createWorkshop(page);
    const updatedCategory =
      await this.categoryModel.findByIdAndUpdate<ICategory>(
        page.category._id,
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
    return updatedCategory;
  }

  async deletePageAndUpdateCategory(
    _id: string,
    categoryIdToUpdate: string,
  ): Promise<{ acknowledged: boolean; deletedCount: number }> {
    await this.categoryModel.findByIdAndUpdate<ICategory>(categoryIdToUpdate, {
      $pull: { workshopDocuments: { _id: new Types.ObjectId(_id) } },
      workshopDocumentsLastUpdated: Date.now(),
    });
    return await this.workshopService.deleteOne(_id);
  }

  async editPageNameUpdateCategory({
    _id,
    name,
    category,
  }: IWorkshopDocument): Promise<IWorkshopDocument> {
    const oldWorkshop = await this.workshopService.updateWorkshopName(
      _id,
      name,
    );
    const id = new Types.ObjectId(_id);
    const newCategoryWorkshopDocument = {
      _id: id,
      name,
      sortId: oldWorkshop.sortId,
    };
    const oldCategoryWorkshopDocument = {
      _id: id,
      name: oldWorkshop.name,
      sortId: oldWorkshop.sortId,
    };
    return await this.categoryModel.findByIdAndUpdate<ICategory>(
      category._id,
      { $set: { 'workshopDocuments.$[elem]': newCategoryWorkshopDocument } },
      {
        arrayFilters: [{ elem: { $eq: oldCategoryWorkshopDocument } }],
        multi: true,
        returnDocument: 'after',
      },
    );
  }

  async sortPages(
    pages: CategoryWorkshopDocument[],
    categoryId: string,
  ): Promise<ICategory> {
    return await this.categoryModel.findByIdAndUpdate<ICategory>(
      categoryId,
      {
        workshopDocuments: pages,
        workshopDocumentsLastUpdated: Date.now(),
      },
      { returnDocument: 'after' },
    );
  }
}
