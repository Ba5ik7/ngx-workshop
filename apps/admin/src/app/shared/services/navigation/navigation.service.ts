// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
// import { Category, CategoryWorkshopDocument } from '../../interfaces/category.interface';
// import { Section } from '../../interfaces/section.interface';

// const sectionSelectedHeaderMap: Map<string, { headerSvgPath: string, sectionTitle: string }> = new Map([
//   ['dashboard', { headerSvgPath: '/assets/img/dashboard-color.png', sectionTitle: 'Dashboard' }],
//   ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
//   ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
//   ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }]
// ]);

// @Injectable({
//   providedIn: 'root'
// })
// export class NavigationService {

//   sectionsSub = new BehaviorSubject<{ [key: string]: Section } | undefined>(undefined);
//   sections$ = this.sectionsSub.asObservable();
//   sections!: { [key: string]: Section };

//   categoriesSub = new BehaviorSubject<Category[] | undefined>(undefined);
//   categories$ = this.categoriesSub.asObservable();
//   categories!: Category[];

//   sectionSub = new BehaviorSubject<any>(undefined);
//   section$ = this.sectionSub.asObservable();
  
//   categorySub = new BehaviorSubject<any>(undefined);
//   category$ = this.categorySub.asObservable();
//   category!: Category;

//   sectionRouteSub = new BehaviorSubject<string>('');
//   sectionRoute$ = this.sectionRouteSub.asObservable();
//   sectionRoute = '';

//   categoryRouteSub = new BehaviorSubject<string>('');
//   categoryRoute$ = this.categoryRouteSub.asObservable();
//   categoryRoute = '';

//   sectionNavListSub = new BehaviorSubject<any>(undefined);
//   sectionNavList$ = this.sectionNavListSub.asObservable();

//   sectionTitleSub = new BehaviorSubject<any>(undefined);
//   sectionTitle$ = this.sectionTitleSub.asObservable();

//   headerSvgPathSub = new BehaviorSubject<any>(undefined);
//   headerSvgPath$ = this.headerSvgPathSub.asObservable();

//   categoryTitleSub = new BehaviorSubject<any>(undefined);
//   categoryTitle$ = this.categoryTitleSub.asObservable();

//   workshopDocumentsSub = new BehaviorSubject<CategoryWorkshopDocument[]>([]);
//   workshopDocuments$: Observable<CategoryWorkshopDocument[]> = this.workshopDocumentsSub.asObservable();
//   workshopDocuments!: CategoryWorkshopDocument[];


//   constructor(private httpClient: HttpClient) { }

//   async initializeAppData(): Promise<void> {
//     await this.getSections();

//     this.sectionRoute$
//     .subscribe((section) => this.setSectionProperties(section));
    
//     this.categoryRoute$
//     .subscribe((category) => {
//       this.categoryRoute = category;
//       this.setCategoryProperties(category)
//     });
//   }

//   private async getSections(): Promise<void> {
//     return await lastValueFrom(this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections'))
//     .then((sections) => this.setSections(sections));
//   }
  
//   private async getCategories(currentSection: string): Promise<void> {
//     const params = new HttpParams().set('section', currentSection);
//     return await lastValueFrom(this.httpClient
//       .get<Category[]>('/api/navigation/categories', { params }))
//       .then((categories) => this.setCategories(categories)
//     );
//   }
    
//   private async setSectionProperties(section: string): Promise<void> {
//     const staticSection = sectionSelectedHeaderMap.get(section);
//     if(staticSection) {
//       this.sectionTitleSub.next(staticSection?.sectionTitle);
//       this.headerSvgPathSub.next(staticSection?.headerSvgPath);
//       this.categoryTitleSub.next('Overview');
//     } else {
//       await this.getCategories(section);
//       this.sectionRoute = section;
//       this.sectionSub.next(this.sections[section]);  
//       this.sectionTitleSub.next(this.sections[section].sectionTitle);
//       this.headerSvgPathSub.next(this.sections[section].headerSvgPath);
//       this.sectionNavListSub.next(this.categories);
//     }
//   }
  
//   private setCategoryProperties(category: string): void {
//     if(this.categories === undefined) return;
//     const currentCategoryObject = this.categories.find(({ id }) => id === category) ?? { sortId: 1 };
//     this.setWorkshops(currentCategoryObject?.workshopDocuments);
//     this.categorySub.next(currentCategoryObject);
//     this.categoryTitleSub.next(currentCategoryObject?.name ?? 'Categories');
//     this.category = currentCategoryObject;
//   }

//   setWorkshops(workshopDocuments: CategoryWorkshopDocument[] = []): void {
//     this.workshopDocumentsSub.next(workshopDocuments);
//     this.workshopDocuments = workshopDocuments;
//   }
  
//   public setCategories(categories: Category[]): void {
//     this.categories = categories;
//     this.categoriesSub.next(categories);
//     this.setCategoryProperties(this.categoryRoute);
//   }
  
//   public setSections(sections: { [key: string]: Section; }): void {
//     this.sections = sections;
//     this.sectionsSub.next(sections);
//   }
// }
//
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MonoTypeOperatorFunction, BehaviorSubject, Observable, timer } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { Section, Workshop, WorkshopDocument } from '../../interfaces/category.interface';


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
      this.http
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
