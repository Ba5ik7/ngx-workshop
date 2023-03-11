import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, lastValueFrom, Observable, OperatorFunction, pipe, UnaryFunction } from 'rxjs';
import { Category, CategoryWorkshopDocument } from '../../interfaces/category.interface';
import { Section } from '../../interfaces/section.interface';
import { WorkshopDocument } from '../../interfaces/workshop-document.interface';

// RXJS Doesn't have something to filter out null and undefined values
export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
  );
}

const dashboardSection: Section = {
  headerSvgPath: '/assets/img/dashboard-color.png',
  sectionTitle: 'Dashboard'
}


const usersSection: Section = {
  headerSvgPath: '/assets/img/users-color.png',
  sectionTitle: 'Users',
}

const sectionSelectedHeaderMap: Map<string, { headerSvgPath: string, sectionTitle: string }> = new Map([
  ['dashboard', { headerSvgPath: '/assets/img/dashboard-color.png', sectionTitle: 'Dashboard' }],
  ['users', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Users' }],
  ['chat', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Chat' }],
  ['settings', { headerSvgPath: '/assets/img/users-color.png', sectionTitle: 'Settings' }]
]);

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sectionsSub = new BehaviorSubject<{ [key: string]: Section } | undefined>(undefined);
  sections$: Observable<any> = this.sectionsSub.asObservable();
  sections!: { [key: string]: Section };

  categoriesSub = new BehaviorSubject<Category[] | undefined>(undefined);
  categories$: Observable<any> = this.categoriesSub.asObservable();
  categories!: Category[];

  sectionSub = new BehaviorSubject<any>(undefined);
  section$: Observable<any> = this.sectionSub.asObservable();
  
  categorySub = new BehaviorSubject<any>(undefined);
  category$: Observable<any> = this.categorySub.asObservable();
  category!: Category;

  sectionRouteSub = new BehaviorSubject<string | undefined>(undefined);
  sectionRoute$: Observable<any> = this.sectionRouteSub.asObservable();
  sectionRoute: string = '';

  categoryRouteSub = new BehaviorSubject<string | undefined>(undefined);
  categoryRoute$: Observable<any> = this.categoryRouteSub.asObservable();
  categoryRoute: string = '';

  sectionNavListSub = new BehaviorSubject<any>(undefined);
  sectionNavList$: Observable<any> = this.sectionNavListSub.asObservable();

  sectionTitleSub = new BehaviorSubject<any>(undefined);
  sectionTitle$: Observable<any> = this.sectionTitleSub.asObservable();

  headerSvgPathSub = new BehaviorSubject<any>(undefined);
  headerSvgPath$: Observable<any> = this.headerSvgPathSub.asObservable();

  categoryTitleSub = new BehaviorSubject<any>(undefined);
  categoryTitle$: Observable<any> = this.categoryTitleSub.asObservable();

  workshopDocumentsSub = new BehaviorSubject<any>(undefined);
  workshopDocuments$: Observable<CategoryWorkshopDocument[]> = this.workshopDocumentsSub.asObservable();
  workshopDocuments!: CategoryWorkshopDocument[];


  constructor(private httpClient: HttpClient) { }

  async initializeAppData(): Promise<void> {
    await this.getSections();
    // await this.getCategories('angular');

    this.sectionRoute$
    .pipe(filterNullish())
    .subscribe((section) => this.setSectionProperties(section));
    
    this.categoryRoute$
    .pipe(filterNullish())
    .subscribe((category) => {
      this.categoryRoute = category;
      this.setCategoryProperties(category)
    });
  }

  private async getSections(): Promise<void> {
    return await lastValueFrom(this.httpClient.get<{ [key: string]: Section }>('/api/navigation/sections'))
    .then((sections) => this.setSections(sections));
  }
  
  private async getCategories(currentSection: string): Promise<void> {
    const params = new HttpParams().set('section', currentSection);
    return await lastValueFrom(this.httpClient
      .get<Category[]>('/api/navigation/categories', { params }))
      .then((categories) => this.setCategories(categories)
    );
  }
    
  private async setSectionProperties(section: string): Promise<void> {
    const staticSection = sectionSelectedHeaderMap.get(section);
    if(staticSection) {
      this.sectionTitleSub.next(staticSection?.sectionTitle);
      this.headerSvgPathSub.next(staticSection?.headerSvgPath);
      this.categoryTitleSub.next('Overview');
    } else {
      await this.getCategories(section);
      this.sectionRoute = section;
      this.sectionSub.next(this.sections[section]);  
      this.sectionTitleSub.next(this.sections[section].sectionTitle);
      this.headerSvgPathSub.next(this.sections[section].headerSvgPath);
      this.sectionNavListSub.next(this.categories);
    }
  }
  
  private setCategoryProperties(category: string): void {
    // When the pages frist loads we need to wait for the categories to be set
    // Once they are this method will be call again.
    if(this.categories === undefined) return;
    const currentCategoryObject = this.categories.find(({ id }) => id === category) ?? { sortId: 1 };
    this.setWorkshops(currentCategoryObject?.workshopDocuments);
    this.categorySub.next(currentCategoryObject);
    this.categoryTitleSub.next(currentCategoryObject?.name ?? 'Categories');
    this.category = currentCategoryObject;
  }

  setWorkshops(workshopDocuments: CategoryWorkshopDocument[] = []): void {
    this.workshopDocumentsSub.next(workshopDocuments);
    this.workshopDocuments = workshopDocuments;
  }
  
  public setCategories(categories: Category[]): void {
    this.categories = categories;
    this.categoriesSub.next(categories);
    this.setCategoryProperties(this.categoryRoute);
  }
  
  public setSections(sections: { [key: string]: Section; }): void {
    this.sections = sections;
    this.sectionsSub.next(sections);
  }
}
