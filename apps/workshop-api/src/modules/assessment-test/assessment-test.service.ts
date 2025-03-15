import { Injectable } from '@nestjs/common';
import {
  AssessmentTest,
  TAssessmentTest,
} from './schemas/assessment-test.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssessmentTestService {
  constructor(
    @InjectModel(AssessmentTest.name)
    private assessmentTestModel: Model<TAssessmentTest>
  ) {}

  async create(assessmentTest: TAssessmentTest) {
    return await this.assessmentTestModel.create(assessmentTest);
  }

  async fetch() {
    return await this.assessmentTestModel.find().exec();
  }

  async update(assessmentTest: TAssessmentTest) {
    return await this.assessmentTestModel.findByIdAndUpdate(
      { _id: assessmentTest._id },
      assessmentTest,
      { returnDocument: 'after'}
    );
  }

  async delete(_id: string) {
    return await this.assessmentTestModel.deleteOne({ _id });
  }
}
