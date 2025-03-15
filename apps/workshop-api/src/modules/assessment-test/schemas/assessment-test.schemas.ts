import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TAssessmentTest = AssessmentTest & Document;

type TestSubject = 'ANGULAR' | 'NESTJS' | 'RXJS';
export interface TestQuestion {
  question: string;
  choices: { value: string }[];
  answer: string;
  correctResponse: string;
  incorrectResponse: string;
}

@Schema()
export class AssessmentTest {

  @Prop({ default: () => 'Test Name' })
  name: string;

  @Prop({ default: () => 'ANGULAR' })
  subject: TestSubject;

  @Prop({ default: () => Date.now() })
  lastUpdated: Date;

  @Prop({ default: () => [] })
  testQuestions: TestQuestion[];
}

export const AssessmentTestSchema = SchemaFactory.createForClass(AssessmentTest);

// Create mock Assessment Test data
// export const mockAssessmentTest: TAssessmentTest = {
//   name: 'Angular Test',
//   subject: 'ANGULAR',
//   lastUpdated: new Date(),
//   testQuestions: [
//     {
//       question: 'What is Angular?',
//       choices: [
//         { value: 'A framework' },
//         { value: 'A library' },
//         { value: 'A programming language' },
//         { value: 'A database' },
//       ],
//       answer: 'A framework',
//       correctResponse: 'Correct! Angular is a framework.',
//       incorrectResponse: 'Incorrect. Angular is a framework.',
//     },
//     {
//       question: 'What is Angular used for?',
//       choices: [
//         { value: 'Building web applications' },
//         { value: 'Building mobile applications' },
//         { value: 'Building desktop applications' },
//         { value: 'All of the above' },
//       ],
//       answer: 'All of the above',
//       correctResponse: 'Correct! Angular is used for building web, mobile, and desktop applications.',
//       incorrectResponse: 'Incorrect. Angular is used for building web, mobile, and desktop applications.',
//     },
//     {
//       question: 'What is Angular written in?',
//       choices: [
//         { value: 'JavaScript' },
//         { value: 'TypeScript' },
//         { value: 'Java' },
//         { value: 'Python' },
//       ],
//       answer: 'TypeScript',
//       correctResponse: 'Correct! Angular is written in TypeScript.',
//       incorrectResponse: 'Incorrect. Angular is written in TypeScript.',
//     },
//   ],
// };

