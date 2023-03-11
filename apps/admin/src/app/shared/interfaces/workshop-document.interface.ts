import { Category } from "./category.interface";

export interface WorkshopDocument {
  _id: string,
  id: string,
  category?: Category;
  sortId: number,
  name: string,
  lastUpdated: Date,
  html: string
}
