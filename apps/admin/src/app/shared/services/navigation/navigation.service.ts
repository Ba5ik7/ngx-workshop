import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, BehaviorSubject, Observable, timer, of } from 'rxjs';
import { shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Section, Sections, Workshop, WorkshopDocument } from '../../interfaces/category.interface';

const staticSections: Map<string, Partial<Section>> = new Map([
  ['dashboard', { headerSvgPath: '/assets/img/dashboard-color.png', sectionTitle: 'Dashboard' }],
  ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
  ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
  ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }]
]);

const staticPages: Map<string, Partial<Workshop>> = new Map([
  ['overview', { name: 'Overview' }],
  ['workshops', { name: 'Workshops' }],
  ['General', { name: 'General' }],
  ['Angular', { name: 'Angular' }],
  ['NestJS', { name: 'NestJS' }],
  ['RxJS', { name: 'RxJS' }],
]);

function shareReplayWithTTL<T>(bufferSize: number, ttl: number): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    const stop$ = timer(ttl);
    const shared$ = source.pipe(takeUntil(stop$), shareReplay(bufferSize));
    return shared$;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private sections$ = new BehaviorSubject<Sections>({});
  private currentSection$ = new BehaviorSubject<Partial<Section> | undefined>(undefined);
  private workshops$ = new BehaviorSubject<Workshop[]>([]);
  private currentWorkshop$ = new BehaviorSubject<Partial<Workshop> | undefined>(undefined);
  private workshopDocument$ = new BehaviorSubject<WorkshopDocument | undefined>(undefined);

  private sectionWorkshopsCache: { [sectionId: string]: Observable<Workshop[]> } = {};
  private workshopDocumentCache: { [workshopDocumentId: string]: Observable<WorkshopDocument> } = {};
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  private http: HttpClient = inject(HttpClient);

  fetchSections() {
    return this.http.get<Sections>('/api/navigation/sections').pipe(
      tap((sections) => {
        this.sections$.next(sections);
      })
    );
  }

  navigateToSection(sectionId: string) {
    return of(sectionId).pipe(
      tap((id) => {
        this.currentSection$.next(
          staticSections.get(id) ?? this.sections$.getValue()[id]
        );
      }),
      switchMap((id) => {
        const staticPage = staticPages.get(id);
        return staticPage ? of(staticPage) : this.fetchSectionWorkshops(id);
      }),
      tap((workshops) => Array.isArray(workshops) && this.workshops$.next(workshops)),
    );
  }

  private fetchSectionWorkshops(sectionId: string) {
    if (!this.sectionWorkshopsCache[sectionId]) {
      this.sectionWorkshopsCache[sectionId] = this.http
        .get<Workshop[]>('/api/navigation/categories', { params: { section: sectionId } })
        .pipe(shareReplayWithTTL(1, this.cacheTTL));
    }
    return this.sectionWorkshopsCache[sectionId];
  }

  navigateToWorkshop(workshopDocumentId: string) {
    const workshop = staticPages.get(workshopDocumentId) ?? this.fetchWorkshopPage(workshopDocumentId);
    this.currentWorkshop$.next(workshop);
    return of(workshop);
  }

  private fetchWorkshopPage(workshopDocumentId: string) {
    if (!this.workshopDocumentCache[workshopDocumentId]) {
      this.workshopDocumentCache[workshopDocumentId] = this.http
        .get<WorkshopDocument>(`/api/workshop-document/${workshopDocumentId}`)
        .pipe(
          tap((workshopDocument) => {
            this.workshopDocument$.next(workshopDocument);
          }),
          shareReplayWithTTL(1, this.cacheTTL)
        );
    }
    this.workshopDocumentCache[workshopDocumentId].subscribe();
    return this.workshops$.getValue().find((workshop) => workshop._id === workshopDocumentId);
  }

  getSections() {
    return this.sections$.asObservable();
  }

  getCurrentSection() {
    return this.currentSection$.asObservable();
  }

  getWorkshops() {
    return this.workshops$.asObservable();
  }

  getCurrentWorkshop() {
    return this.currentWorkshop$.asObservable();
  }

  getWorkshopDocument() {
    return this.workshopDocument$.asObservable();
  }
}
