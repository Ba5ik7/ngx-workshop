import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Workshop } from '../interfaces/category.interface';
import { NavigationService } from '../services/navigation/navigation.service';

type SectionResolver = ResolveFn<Observable<Partial<Workshop> | Workshop[]>>;
export const sectionResolver: SectionResolver = (route) => {
  const param = route.routeConfig?.path ?? ':';// Path has a `:` prefix and need to remove it
  const sectionId = route.params[param.substring(1)] ?? route.routeConfig?.path;
  console.log('sectionResolver', sectionId);
  
  return inject(NavigationService).navigateToSection(sectionId ?? '');
};
