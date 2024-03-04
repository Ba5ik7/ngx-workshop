import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { OpenaiComponent } from './openai.component';
import { Route } from '@angular/router';
import { openaiResolver } from '../../../../shared/resolvers/openai.resolver';

export const OPENAI_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'responses'
  },
  {
    canActivate: [AuthGuard],
    resolve: { openaiResolver },
    path: 'responses',
    component: OpenaiComponent
  }
];
