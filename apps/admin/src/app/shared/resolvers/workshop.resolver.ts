import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Workshop } from '../interfaces/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';

type WorkshopResolver = ResolveFn<Observable<Partial<Workshop> | undefined>>;
export const workshopResolver: WorkshopResolver = (route) => {
  const param = route.routeConfig?.path ?? ':';// Path has a `:` prefix and need to remove it
  const workshopId = route.params[param.substring(1)] ?? route.routeConfig?.path;
  return inject(NavigationService).navigateToWorkshop(workshopId ?? '');
};
