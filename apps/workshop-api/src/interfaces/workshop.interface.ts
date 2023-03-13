import { ICategory } from './category.interface';

export interface IWorkshopDocument {
  _id?: string;
  id?: string;
  category?: ICategory;
  sortId?: number;
  name?: string;
  lastUpdated?: Date;
  html?: string;
}
