import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, BehaviorSubject, Observable, timer } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Section, Workshop, WorkshopDocument } from '../../interfaces/category.interface';

const staticSections: Map<string, Partial<Section>> = new Map([
  ['dashboard', { headerSvgPath: '/assets/img/dashboard-color.png', sectionTitle: 'Dashboard' }],
  ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
  ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
  ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }]
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
  private sections$ = new BehaviorSubject<Section[]>([]);
  private currentSection$ = new BehaviorSubject<Partial<Section> | undefined>(undefined);
  private workshops$ = new BehaviorSubject<Workshop[]>([]);
  private currentWorkshops$ = new BehaviorSubject<Workshop | null>(null);
  private workshopDocument$ = new BehaviorSubject<WorkshopDocument | null>(null);

  private sectionWorkshopsCache: { [sectionId: string]: Observable<Workshop[]> } = {};
  private workshopDocumentCache: { [workshopDocumentId: string]: Observable<WorkshopDocument> } = {};
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  private http: HttpClient = inject(HttpClient);

  fetchSections() {
    return this.http.get<Section[]>('/api/navigation/sections').pipe(
      tap((sections) => {
        this.sections$.next(sections);
      })
    );
  }

  navigateToSection(sectionId: string) {
    const section = staticSections.get(sectionId) ?? this.fetchSectionWorkshops(sectionId);
    this.currentSection$.next(section);
  }

  private fetchSectionWorkshops(sectionId: string) {
    if (!this.sectionWorkshopsCache[sectionId]) {
      this.sectionWorkshopsCache[sectionId] = this.http
        .get<Workshop[]>('/api/navigation/workshops', { params: { section: sectionId } })
        .pipe(
          tap((workshops) => {
            this.workshops$.next(workshops);
          }),
          shareReplayWithTTL(1, this.cacheTTL)
        );
    }
    this.sectionWorkshopsCache[sectionId].subscribe();
    return this.sections$.getValue().find((section) => section._id === sectionId);
  }

  navigateToWorkshop(workshopDocumentId: string) {
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
    return this.currentWorkshops$.asObservable();
  }

  getWorkshopDocument() {
    return this.workshopDocument$.asObservable();
  }
}
