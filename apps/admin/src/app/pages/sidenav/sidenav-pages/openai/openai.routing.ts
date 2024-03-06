import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { OpenaiComponent } from './openai.component';
import { Route } from '@angular/router';
import { openaiResolver } from '../../../../shared/resolvers/openai.resolver';

export const OPENAI_ROUTES: Route[] = [
  {
    path: '',
    component: OpenaiComponent,
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
      },
      {
        canActivate: [AuthGuard],
        path: 'chat',
        loadComponent: () => import('./openai-pages/chat/chat.component').then(m => m.ChatComponent)
      },
      {
        canActivate: [AuthGuard],
        path: 'history',
        resolve: { openaiResolver },
        loadComponent: () => import('./openai-pages/history/history.component').then(m => m.HistoryComponent)
      },
      {
        canActivate: [AuthGuard],
        path: 'workshop-creator',
        loadComponent: () => import('./openai-pages/openai-workshop-creator/openai-workshop-creator.component').then(m => m.OpenaiWorkshopCreatorComponent)
      },
    ]
  }
];
// workshop-creator