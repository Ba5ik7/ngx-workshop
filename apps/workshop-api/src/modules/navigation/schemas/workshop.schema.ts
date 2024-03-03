import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IWorkshopDocumentIdentifier } from '../../../interfaces/workshop.interface';

export type TWorkshopDocument = Workshop & Document;

@Schema()
export class Workshop {
  // todo this needs to be unique and handle FE errors
  @Prop()
  workshopDocumentGroupId: string;

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

  @Prop({ 
    required: true,
    default: 'https://via.placeholder.com/250/400',
  })
  thumbnail: string;

  @Prop()
  workshopDocuments: IWorkshopDocumentIdentifier[];

  @Prop()
  workshopDocumentsLastUpdated: Date;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);

WorkshopSchema.pre('save', async function () {
  if (this.isNew) {
    this.workshopDocumentGroupId = toSpinalCase(this.name);
  }
});
// todo: move this to a utils file
export function toSpinalCase(str: string): string {
  return str
    .replace(/^[\W_]+|[\W_]+$|([\W_]+)/g, ($0, $1) => {
      return $1 ? '-' : '';
    })
    .replace(/([a-z])(?=[A-Z])/g, '$1-')
    .toLowerCase();
}
