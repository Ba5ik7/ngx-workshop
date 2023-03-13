import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../../enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    immutable: true,
    default: () => Date.now(),
  })
  createdAt: Date;

  @Prop({ default: () => Date.now() })
  updatedAt: Date;

  @Prop({ type: String, default: () => Role.Regular })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
