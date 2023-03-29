import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, BehaviorSubject, Observable, timer } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Section, Workshop, WorkshopDocument } from '../../interfaces/category.interface';

// const sectionSelectedHeaderMap: Map<string, { headerSvgPath: string, sectionTitle: string }> = new Map([
//   ['dashboard', { headerSvgPath: '/assets/img/dashboard-color.png', sectionTitle: 'Dashboard' }],
//   ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
//   ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
//   ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }]
// ]);

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
  private workshops$ = new BehaviorSubject<Workshop[]>([]);
  private workshopDocument$ = new BehaviorSubject<WorkshopDocument | null>(null);

  private sectionCache: { [sectionId: string]: Observable<Workshop[]> } = {};
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
    if (!this.sectionCache[sectionId]) {
      this.sectionCache[sectionId] = this.http
        .get<Workshop[]>('/api/navigation/workshops', { params: { section: sectionId } })
        .pipe(
          tap((workshops) => {
            this.workshops$.next(workshops);
          }),
          shareReplayWithTTL(1, this.cacheTTL)
        );
    }
    this.sectionCache[sectionId].subscribe();
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

  getWorkshops() {
    return this.workshops$.asObservable();
  }

  getWorkshopDocument() {
    return this.workshopDocument$.asObservable();
  }
}
