import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Workshop } from '../interfaces/category.interface';
import { NavigationService } from '../services/navigation/navigation.service';

type WorkshopResolver = ResolveFn<Observable<Partial<Workshop> | undefined>>;
export const workshopResolver: WorkshopResolver = (route) => {
  return inject(NavigationService).navigateToWorkshop(route.routeConfig?.path ?? '');
};
