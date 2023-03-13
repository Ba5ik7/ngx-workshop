import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryWorkshopDocument } from '../../../interfaces/category.interface';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  // todo this needs to be unique and handle FE errors
  @Prop()
  id: string;

  @Prop({ required: true })
  sectionId: string;

  @Prop({
    default: () => 0,
  })
  sortId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  summary: string;

  @Prop()
  packageName: string;

  @Prop()
  exampleSpecs: string;

  @Prop()
  examples: string[];

  @Prop()
  apiDocId: string;

  @Prop()
  overviewPath: string;

  @Prop()
  additionalApiDocs: string;

  @Prop()
  workshopDocuments: CategoryWorkshopDocument[];

  @Prop()
  workshopDocumentsLastUpdated: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', async function () {
  if (this.isNew) {
    this.id = toSpinalCase(this.name);
  }
});
// todo: move this to a utils file
function toSpinalCase(str: string): string {
  return str
    .replace(/^[\W_]+|[\W_]+$|([\W_]+)/g, ($0, $1) => {
      return $1 ? '-' : '';
    })
    .replace(/([a-z])(?=[A-Z])/g, '$1-')
    .toLowerCase();
}
