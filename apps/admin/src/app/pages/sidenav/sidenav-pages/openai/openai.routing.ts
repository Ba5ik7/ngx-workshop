import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { OpenaiComponent } from './openai.component';
import { Route } from '@angular/router';
import { openaiResolver } from '../../../../shared/resolvers/openai.resolver';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';

export const OPENAI_ROUTES: Route[] = [
  {
    path: '',
    component: OpenaiComponent,
    children: [
      {
        path: '',
        redirectTo: 'Angular',
        pathMatch: 'full'
      },
      {
        canActivate: [AuthGuard],
        path: 'history',
        resolve: { openaiResolver, workshopResolver },
        loadComponent: () => import('./openai-pages/history/history.component').then(m => m.HistoryComponent)
      },
      {
        canActivate: [AuthGuard],
        path: 'workshop-creator',
        loadComponent: () => import('./openai-pages/openai-workshop-creator/openai-workshop-creator.component').then(m => m.OpenaiWorkshopCreatorComponent)
      },
      {
        canActivate: [AuthGuard],
        path: ':chatRoom',
        resolve: { workshopResolver },
        loadComponent: () => import('./openai-pages/chat/chat.component').then(m => m.ChatComponent)
      }
    ]
  }
];
