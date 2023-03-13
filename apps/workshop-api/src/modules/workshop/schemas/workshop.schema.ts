import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkshopDocument = Workshop & Document;

@Schema()
export class Workshop {
  @Prop({ required: true })
  id: string;

  @Prop({ default: () => 'Page' })
  name: string;

  @Prop({ default: () => 0 })
  sortId: number;

  @Prop({ default: () => Date.now() })
  lastUpdated: Date;

  @Prop({
    default: () => JSON.stringify(defaultWorkshopHtml),
  })
  html: string;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);

const defaultWorkshopHtml = [
  {
    blockId: 'eftkta822ke',
    sortIndex: 0,
    name: 'NgxEditorjsHeaderBlockMediator',
    dataClean: 'Create a Magical Workshop&nbsp;🪄',
  },
];
