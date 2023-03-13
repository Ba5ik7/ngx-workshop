import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  sectionTitle: string;

  @Prop()
  summary: number;

  @Prop()
  menuSvgPath: string;

  @Prop()
  headerSvgPath: string;

  @Prop()
  categoriesLastUpdated: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
