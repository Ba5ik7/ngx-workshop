import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';
import { Workshop } from '../interfaces/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';
import { LoaderService } from '../services/loader/loader.service';

type WorkshopResolver = ResolveFn<Observable<Partial<Workshop> | undefined>>;
export const workshopResolver: WorkshopResolver = (route) => {
  const loaderService = inject(LoaderService);
  const param = route.routeConfig?.path ?? ':';
  const workshopId = route.params[param.substring(1)] ?? route.routeConfig?.path;

  const loaderTimeout = setTimeout(() => loaderService.show(), 100);

  return inject(NavigationService).navigateToWorkshop(workshopId ?? '').pipe(
    tap(() => clearTimeout(loaderTimeout)),
    finalize(() => loaderService.hide())
  );
};
