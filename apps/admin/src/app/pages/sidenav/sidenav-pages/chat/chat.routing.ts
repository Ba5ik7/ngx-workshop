import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';
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
    resolve: { workshopResolver },
    path: ':chatRoom',
    component: ChatComponent
  }
];
