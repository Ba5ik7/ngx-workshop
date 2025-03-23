import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type TUserAssessmentTest = UserAssessmentTest & Document;
type TestSubject = 'ANGULAR' | 'NESTJS' | 'RXJS';

export interface TestQuestion {
  question: string;
  choices: { value: string }[];
  answer: string;
  correctResponse: string;
  incorrectResponse: string;
}

@Schema()
export class UserAssessmentTest {
  @Prop({ required: true })
  assessmentTestId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: () => 'ANGULAR' })
  subject: TestSubject;

  @Prop({ default: () => [] })
  userAnswers: string[];

  @Prop({ default: false })
  passed: boolean;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: () => Date.now() })
  lastUpdated: Date;
}

export const UserAssessmentTestSchema =
  SchemaFactory.createForClass(UserAssessmentTest);
