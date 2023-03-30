import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Section } from '../interfaces/category.interface';
import { NavigationService } from '../services/navigation/navigation.service';

type SectionResolver = ResolveFn<Observable<Partial<Section> | undefined>>;
export const sectionResolver: SectionResolver = (route) => {
  return inject(NavigationService).navigateToSection(route.routeConfig?.path ?? '');
};
