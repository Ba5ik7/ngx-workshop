import { Injectable } from '@nestjs/common';
import {
  AssessmentTest,
  TAssessmentTest,
} from './schemas/assessment-test.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserAssessmentTest,
  TUserAssessmentTest,
} from './schemas/user-assessment-test.schemas';
import {
  catchError,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable()
export class AssessmentTestService {
  constructor(
    @InjectModel(UserAssessmentTest.name)
    private userAssessmentTestModel: Model<TUserAssessmentTest>,
    @InjectModel(AssessmentTest.name)
    private assessmentTestModel: Model<TAssessmentTest>
  ) {}

  async create(assessmentTest: TAssessmentTest) {
    return await this.assessmentTestModel.create(assessmentTest);
  }

  async fetch() {
    return await this.assessmentTestModel.find().exec();
  }

  async fetchAssessmentTest(id: string) {
    return await this.assessmentTestModel
      .findById(new Types.ObjectId(id))
      .exec();
  }

  async update(assessmentTest: TAssessmentTest) {
    return await this.assessmentTestModel.findByIdAndUpdate(
      { _id: assessmentTest._id },
      assessmentTest,
      { returnDocument: 'after' }
    );
  }

  async delete(_id: string) {
    return await this.assessmentTestModel.deleteOne({ _id });
  }

  async fetchUsersAssessments(userId: string) {
    return await this.userAssessmentTestModel.find({ userId }).exec();
  }

  fetchUserSubjectsEligibility(userId: string, subjects: string[]) {
    return forkJoin({
      userTests: from(
        this.userAssessmentTestModel.find({
          userId,
          subject: { $in: subjects },
        })
      ),
      assessmentTests: from(
        this.assessmentTestModel.find({ subject: { $in: subjects } })
      ),
    }).pipe(
      map(({ userTests, assessmentTests }) => {
        const userTestsArray = Array.isArray(userTests)
          ? userTests
          : [userTests];
        const assessmentTestsArray = Array.isArray(assessmentTests)
          ? assessmentTests
          : [assessmentTests];
        return subjects.map((subject) => {
          const completedCount = userTestsArray.filter(
            (test) => test.subject === subject && test.completed
          ).length;
          const totalCount = assessmentTestsArray.filter(
            (test) => test.subject === subject
          ).length;
          return {
            subject,
            levelCount: completedCount,
            totalCount,
            enabled: completedCount < totalCount,
          };
        });
        // .filter(({ levelCount, totalCount }) => levelCount < totalCount)
        // .map(({ subject, levelCount }) => ({ subject, levelCount }));
      }),
      catchError((err) =>
        throwError(
          () => new Error(`Failed to fetch subjects level: ${err.message}`)
        )
      )
    );
  }

  startTest(subject: string, userId: string): Observable<TUserAssessmentTest> {
    return from(this.userAssessmentTestModel.find({ userId, subject })).pipe(
      map((userAssessmentsTests) => {
        const testsArray = Array.isArray(userAssessmentsTests)
          ? userAssessmentsTests
          : [userAssessmentsTests];
        const incompleteTest = testsArray.find((test) => !test.completed);
        return incompleteTest ? incompleteTest : testsArray;
      }),

      switchMap((result) => {
        if (!Array.isArray(result)) {
          return from(Promise.resolve(result as TUserAssessmentTest));
        }

        const nextTestLevel = result.length + 1;

        return from(
          this.assessmentTestModel.findOne({ subject, level: nextTestLevel })
        ).pipe(
          switchMap((nextAssessmentTest) => {
            if (!nextAssessmentTest) {
              return throwError(
                () => new Error(`User has maxed out tests for ${subject}`)
              );
            }

            return from(
              this.userAssessmentTestModel.create({
                assessmentTestId: nextAssessmentTest._id,
                testName: nextAssessmentTest.name,
                userId,
                subject,
              })
            );
          })
        );
      }),
      catchError((err) =>
        throwError(() => new Error(`Failed to start test: ${err.message}`))
      )
    );
  }

  submitTest(
    userAssessmentTestId: string,
    answers: string[]
  ): Observable<TUserAssessmentTest> {
    return from(
      this.userAssessmentTestModel.findById(userAssessmentTestId)
    ).pipe(
      switchMap((userAssessmentTest) => {
        if (!userAssessmentTest)
          return throwError(() => new Error('User assessment test not found'));
        if (userAssessmentTest.completed)
          return throwError(
            () => new Error('User assessment test already completed')
          );

        return from(
          this.assessmentTestModel.findById(userAssessmentTest.assessmentTestId)
        ).pipe(
          switchMap((assessmentTest) => {
            if (!assessmentTest)
              return throwError(() => new Error('Assessment test not found'));

            if (answers.length !== assessmentTest.testQuestions.length)
              return throwError(() => new Error('Invalid number of answers'));

            const score = answers.reduce((acc, answer, index) => {
              return answer === assessmentTest.testQuestions[index].answer
                ? acc + 1
                : acc;
            }, 0);

            return from(
              this.userAssessmentTestModel.findByIdAndUpdate(
                userAssessmentTestId,
                {
                  completed: true,
                  score,
                  passed: score === assessmentTest.testQuestions.length,
                  userAnswers: answers,
                },
                { returnDocument: 'after' }
              )
            );
          })
        );
      }),
      catchError((err) =>
        throwError(() => new Error(`Failed to finish test: ${err.message}`))
      )
    );
  }
}
