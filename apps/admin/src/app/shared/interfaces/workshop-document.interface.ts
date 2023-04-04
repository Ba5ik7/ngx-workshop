import { Workshop } from "./category.interface";

export interface WorkshopDocument {
  _id: string,
  id: string,
  category?: Workshop;
  sortId: number,
  name: string,
  lastUpdated: Date,
  html: string
}
