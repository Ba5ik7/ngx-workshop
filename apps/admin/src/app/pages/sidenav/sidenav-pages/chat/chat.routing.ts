import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { ChatComponent } from './chat.component';
import { Route } from '@angular/router';

export const CHAT_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'General'
  },
  {
    canActivate: [AuthGuard],
    path: ':chatRoom',
    component: ChatComponent
  }
];
