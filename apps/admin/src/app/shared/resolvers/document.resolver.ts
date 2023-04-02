import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Workshop } from '../interfaces/category.interface';
import { NavigationService } from '../services/navigation/navigation.service';

type DocumentResolver = ResolveFn<Observable<Partial<Workshop> | undefined>>;
export const documentResolver: DocumentResolver = (route) => {
  console.log('documentResolver', route.params['workshopId']);
  
  const param = route.routeConfig?.path ?? ':';// Path has a `:` prefix and need to remove it
  const workshopId = route.params[0] ?? '';
  
  return inject(NavigationService).navigateToDocument(route.params['workshopId'] ?? '');
};
