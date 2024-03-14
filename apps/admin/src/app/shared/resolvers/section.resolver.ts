import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';
import { Workshop } from '../interfaces/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';
import { LoaderService } from '../services/loader/loader.service';

type SectionResolver = ResolveFn<Observable<Partial<Workshop> | Workshop[]>>;
export const sectionResolver: SectionResolver = (route) => {
  const loaderService = inject(LoaderService);
  const param = route.routeConfig?.path ?? ':';// Path has a `:` prefix and need to remove it
  const sectionId = route.params[param.substring(1)] ?? route.routeConfig?.path;
  
  const loaderTimeout = setTimeout(() => loaderService.show(), 200);
  
  return inject(NavigationService).navigateToSection(sectionId ?? '').pipe(
    tap(() => clearTimeout(loaderTimeout)),
    finalize(() => loaderService.hide())
  );
};
