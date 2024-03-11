import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, BehaviorSubject, Observable, timer, of } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Section, Sections, Workshop, WorkshopDocument } from '../../interfaces/navigation.interface';

const staticSections: Map<string, Partial<Section>> = new Map([
  ['dashboard', { headerSvgPath: 'https://res.cloudinary.com/dowdpiikk/image/upload/v1710125599/ktmfdy5gaqbl1p5qvjgj.svg', sectionTitle: 'Dashboard' }],
  ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
  ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
  ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }],
  ['openai', { headerSvgPath: 'https://res.cloudinary.com/dowdpiikk/image/upload/v1710125599/ohvhsxfrnabofkfochnf.svg', sectionTitle: 'OpenAI' }]
]);

const staticPages: Map<string, Partial<Workshop>> = new Map([
  ['overview', { name: 'Overview' }],
  ['openai', { name: 'OpenAI' }],
  ['workshop-list', { name: 'Workshops' }],
  ['General', { name: 'General' }],
  ['Angular', { name: 'Angular' }],
  ['NestJS', { name: 'NestJS' }],
  ['RxJS', { name: 'RxJS' }],
  ['history', { name: 'History' }],
  ['workshop-creator', { name: 'Workshop Creator' }],
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

  navigateToSection(sectionId: string,  force=false) {
    return of(sectionId).pipe(
      tap((id) => {
        this.currentSection$.next(
          staticSections.get(id) ?? this.sections$.getValue()[id]
        );
      }),
      switchMap((id) => {
        if(!staticSections.get(id)) {
          const staticPage = staticPages.get(id);
          return staticPage ? of(staticPage) : this.fetchSectionWorkshops(id, force);
        }
        return of([]);
      }),
      tap((workshops) => Array.isArray(workshops) && this.workshops$.next(workshops)),
    );
  }

  private fetchSectionWorkshops(sectionId: string, force=false) {
    if (force || !this.sectionWorkshopsCache[sectionId]) {
      this.sectionWorkshopsCache[sectionId] = this.http
        .get<Workshop[]>('/api/navigation/workshops', { params: { section: sectionId } })
        .pipe(shareReplayWithTTL(1, this.cacheTTL));
    }
    return this.sectionWorkshopsCache[sectionId];
  }

  navigateToWorkshop(workshopDocumentId: string) {
    return of(workshopDocumentId).pipe(
      tap((id) => {
        this.currentWorkshop$.next(
          staticPages.get(id) ?? 
          this.workshops$.getValue()
            .find((workshop) => workshop.workshopDocumentGroupId === id)
        );
      }),
      map(() => this.currentWorkshop$.getValue())
    );
  }

  navigateToDocument(workshopDocumentId: string) {
    return this.http
    .get<WorkshopDocument>(`/api/workshop/${workshopDocumentId}`)
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
