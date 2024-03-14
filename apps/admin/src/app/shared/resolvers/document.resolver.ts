import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';
import { Workshop } from '../interfaces/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';
import { LoaderService } from '../services/loader/loader.service';

type DocumentResolver = ResolveFn<Observable<Partial<Workshop> | undefined>>;
export const documentResolver: DocumentResolver = (route) => {
  // return of(route.params['documentName'])
  // .pipe(
  //   switchMap((documentName) => {
  //     return inject(NavigationService).navigateToDocument(workshopId);
  //   })
  // );


  // const param = route.routeConfig?.path ?? ':';// Path has a `:` prefix and need to remove it
  // const workshopId = route.params[0] ?? '';

  const loaderService = inject(LoaderService);
  const loaderTimeout = setTimeout(() => loaderService.show(), 200);
  
  return inject(NavigationService).navigateToDocument(route.params['documentId'] ?? '').pipe(
    tap(() => clearTimeout(loaderTimeout)),
    finalize(() => loaderService.hide())
  );
};
