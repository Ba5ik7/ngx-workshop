import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TUserAssessmentTest,
  UserAssessmentTest,
} from './schemas/user-assessment-test.schemas';

@Injectable()
export class UserAssessmentTestService {
  constructor(
    @InjectModel(UserAssessmentTest.name)
    private assessmentTestModel: Model<TUserAssessmentTest>
  ) {}

  async create(assessmentTest: TUserAssessmentTest) {
    return await this.assessmentTestModel.create(assessmentTest);
  }

  async fetch() {
    return await this.assessmentTestModel.find().exec();
  }

  async update(assessmentTest: TUserAssessmentTest) {
    return await this.assessmentTestModel.findByIdAndUpdate(
      { _id: assessmentTest._id },
      assessmentTest,
      { returnDocument: 'after' }
    );
  }

  async delete(_id: string) {
    return await this.assessmentTestModel.deleteOne({ _id });
  }
}
