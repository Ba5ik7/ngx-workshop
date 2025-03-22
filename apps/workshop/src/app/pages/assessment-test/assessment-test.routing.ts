import { Route } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const ASSESSMENT_TEST_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    // resolve: { assessmentTestResolver },
    loadComponent: () =>
      import('./assessment-test.component').then(
        (m) => m.AssessmentTestComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
