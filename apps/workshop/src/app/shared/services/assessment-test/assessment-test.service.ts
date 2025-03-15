import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentTestService {
  httpClient = inject(HttpClient);

  assessmentTest = new BehaviorSubject<any>(null);
  assessmentTest$ = this.assessmentTest.asObservable();

  fetchAssessmentTest() {
    return this.httpClient
      .get('/api/assessment-test')
      .pipe(
        tap((data) => {
          this.assessmentTest.next(data);
        })
      );
  }
}
