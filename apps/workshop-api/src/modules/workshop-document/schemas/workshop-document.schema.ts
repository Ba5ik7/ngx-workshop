import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TWorkshopDocument = WorkshopDocument & Document;

@Schema()
export class WorkshopDocument {
  @Prop({ required: true })
  workshopGroupId: string;

  @Prop({ default: () => 'Page' })
  name: string;

  @Prop({ default: () => 0 })
  sortId: number;

  @Prop({ default: () => Date.now() })
  lastUpdated: Date;

  @Prop({
    default: () => JSON.stringify(defaultWorkshopDocumentHtml),
  })
  html: string;
}

export const WorkshopDocumentSchema = SchemaFactory.createForClass(WorkshopDocument);

const defaultWorkshopDocumentHtml = [
  {
    blockId: 'eftkta822ke',
    sortIndex: 0,
    name: 'NgxEditorjsHeaderBlockMediator',
    dataClean: 'Create a Magical Workshop&nbsp;🪄',
  },
];
