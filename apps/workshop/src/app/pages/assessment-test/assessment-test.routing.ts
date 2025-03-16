import { Route } from '@angular/router';
import { AssessmentTestComponent } from './assessment-test.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const ASSESSMENT_TEST_ROUTES: Route[] = [
  {
    path: '',
    component: AssessmentTestComponent,
    children: [
      {
        path: '',
        redirectTo: 'test-selection',
        pathMatch: 'full',
      },
      {
        path: 'test-selection',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./test-selection/test-selection.component').then(
            (m) => m.TestSelectionComponent
          ),
      },
    ],
  },
];
