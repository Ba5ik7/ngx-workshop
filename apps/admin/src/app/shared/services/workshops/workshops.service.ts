// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Workshop, WorkshopDocument } from '../../interfaces/category.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkshopEditorService {
//   private httpClient = inject(HttpClient);

//   saveEditorDataSubject = new Subject<boolean>();
//   saveEditorData$ = this.saveEditorDataSubject.asObservable();

//   savePageHTMLErrorSubject = new Subject<number>();
//   savePageHTMLError$ = this.savePageHTMLErrorSubject.asObservable();

//   savePageHTMLSuccessSubject = new Subject<WorkshopDocument>();
//   savePageHTMLSuccess$ = this.savePageHTMLSuccessSubject.asObservable();

//   createWorkshopFormErrorSubject = new Subject<number>();
//   createWorkshopFormError$ = this.createWorkshopFormErrorSubject.asObservable();

//   createWorkshopFormSuccessSubject = new Subject<Workshop>();
//   createWorkshopFormSuccess$ = this.createWorkshopFormSuccessSubject.asObservable();

//   editWorkshopFormErrorSubject = new Subject<number>();
//   editWorkshopFormError$ = this.editWorkshopFormErrorSubject.asObservable();

//   editWorkshopFormSuccessSubject = new Subject<Workshop>();
//   editWorkshopFormSuccess$ = this.editWorkshopFormSuccessSubject.asObservable();

//   deleteWorkshopFormErrorSubject = new Subject<number>();
//   deleteWorkshopFormError$ = this.deleteWorkshopFormErrorSubject.asObservable();

//   deleteWorkshopFormSuccessSubject = new Subject<string>();
//   deleteWorkshopFormSuccess$ = this.deleteWorkshopFormSuccessSubject.asObservable();

//   sortWorkshopFormErrorSubject = new Subject<number>();
//   sortWorkshopFormError$ = this.sortWorkshopFormErrorSubject.asObservable();

//   sortWorkshopFormSuccessSubject = new Subject<Workshop[]>();
//   sortWorkshopFormSuccess$ = this.sortWorkshopFormSuccessSubject.asObservable();

//   createPageFormErrorSubject = new Subject<number>();
//   createPageFormError$ = this.createPageFormErrorSubject.asObservable();

//   createPageFormSuccessSubject = new Subject<WorkshopDocument>();
//   createPageFormSuccess$ = this.createPageFormSuccessSubject.asObservable();

//   deletePageFormErrorSubject = new Subject<number>();
//   deletePageFormError$ = this.deletePageFormErrorSubject.asObservable();

//   deletePageFormSuccessSubject = new Subject<WorkshopDocument>();
//   deletePageFormSuccess$ = this.deletePageFormSuccessSubject.asObservable();

//   editPageFormErrorSubject = new Subject<number>();
//   editPageFormError$ = this.editPageFormErrorSubject.asObservable();

//   editPageFormSuccessSubject = new Subject<Workshop>();
//   editPageFormSuccess$ = this.editPageFormSuccessSubject.asObservable();

//   sortPagesFormErrorSubject = new Subject<number>();
//   sortPagesFormError$ = this.sortPagesFormErrorSubject.asObservable();

//   sortPagesFormSuccessSubject = new Subject<WorkshopDocument[]>();
//   sortPagesFormSuccess$ = this.sortPagesFormSuccessSubject.asObservable();

//   savePageHTML(html: string, _id: string): void {
//     this.httpClient
//     .post<WorkshopDocument>('/api/workshop/update-workshop-html', { _id, html })
//     .subscribe({
//       next: (page) => this.savePageHTMLSuccessSubject.next(page),
//       error: (httpError: HttpErrorResponse) => this.savePageHTMLErrorSubject.next(httpError.status)
//     });
//   }

//   createWorkshop(workshop: Workshop): void {
//     this.httpClient.post<Workshop>('/api/navigation/category/create-category', workshop)
//     .subscribe({
//       next: (workshop) => this.createWorkshopFormSuccessSubject.next(workshop),
//       error: (httpError: HttpErrorResponse) => this.createWorkshopFormErrorSubject.next(httpError.status)
//     });
//   }

//   editWorkshopNameAndSummary(workshop: Workshop): void {
//     this.httpClient.post<Workshop>('/api/navigation/category/edit-category-name-and-summary', workshop)
//     .subscribe({
//       next: (editedWorkshop) => this.editWorkshopFormSuccessSubject.next(editedWorkshop),
//       error: (httpError: HttpErrorResponse) => this.editWorkshopFormErrorSubject.next(httpError.status)
//     });
//   }

//   deleteWorkshop(_id: string): void {
//     this.httpClient.post<Workshop>('/api/navigation/category/delete-category-and-workshops', { _id })
//     .subscribe({
//       next: () => this.deleteWorkshopFormSuccessSubject.next(_id),
//       error: (httpError: HttpErrorResponse) => this.deleteWorkshopFormErrorSubject.next(httpError.status)
//     });
//   }

//   sortCategories(categories: Workshop[]): void {
//     this.httpClient.post<Workshop[]>('/api/navigation/category/sort-categories', categories)
//     .subscribe({
//       next: () => this.sortWorkshopFormSuccessSubject.next(categories),
//       error: (httpError: HttpErrorResponse) => this.sortWorkshopFormErrorSubject.next(httpError.status)
//     });
//   }

//   createPage(page: WorkshopDocument): void {
//     this.httpClient.post<WorkshopDocument>('/api/navigation/page/create-page', page)
//     .subscribe({
//       next: (createdPage) => this.createPageFormSuccessSubject.next(createdPage),
//       error: (httpError: HttpErrorResponse) => this.createPageFormErrorSubject.next(httpError.status)
//     });
//   }

//   deletePage(page: WorkshopDocument): void {
//     this.httpClient.post<WorkshopDocument>('/api/navigation/page/delete-page-and-update-category', page)
//     .subscribe({
//       next: () => this.deletePageFormSuccessSubject.next(page),
//       error: (httpError: HttpErrorResponse) => this.deletePageFormErrorSubject.next(httpError.status)
//     });
//   }

//   editPageNameAndSummary(page: WorkshopDocument): void {
//     this.httpClient.post<Workshop>('/api/navigation/page/edit-page-name-update-category', page)
//     .subscribe({
//       next: (category) => this.editPageFormSuccessSubject.next(category),
//       error: (httpError: HttpErrorResponse) => this.editPageFormErrorSubject.next(httpError.status)
//     });
//   }

//   sortPages(pages: WorkshopDocument[], categoryId: string = ''): void {
//     const params = new HttpParams().set('categoryId', categoryId);
//     this.httpClient
//     .post<WorkshopDocument[]>('/api/navigation/page/sort-pages', pages, { params })
//     .subscribe({
//       next: () => this.sortPagesFormSuccessSubject.next(pages),
//       error: (httpError: HttpErrorResponse) => this.sortPagesFormErrorSubject.next(httpError.status)
//     });
//   }
// }




import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workshop, WorkshopDocument } from '../../interfaces/category.interface';

export interface Result<T> {
  success?: T;
  error?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopEditorService {
  private readonly baseUrl = '/api';
  private httpClient = inject(HttpClient);


  saveEditorDataSubject = new Subject<boolean>();
  saveEditorData$ = this.saveEditorDataSubject.asObservable();


  private apiCall<T>(url: string, body: unknown, method: 'post' | 'get' = 'post', params?: HttpParams) {
    const request = this.httpClient.request<T>(method, this.baseUrl + url, {
      body,
      params,
    });

    return request.pipe(
      map((data: T) => ({ success: data } as Result<T>)),
    );
  }
        
  savePageHTML(html: string, _id: string) {
    return this.apiCall<WorkshopDocument>('/workshop/update-workshop-html', { _id, html });
  }
        
  createWorkshop(workshop: Workshop) {
    return this.apiCall<Workshop>('/navigation/category/create-category', workshop);
  }
        
  editWorkshopNameAndSummary(workshop: Workshop) {
    return this.apiCall<Workshop>('/navigation/category/edit-category-name-and-summary', workshop);
  }
        
  deleteWorkshop(_id: string) {
    return this.apiCall<Workshop>('/navigation/category/delete-category-and-workshops', { _id });
  }
      
  sortCategories(categories: Workshop[]) {
    return this.apiCall<Workshop[]>('/navigation/category/sort-categories', categories);
  }
      
  createPage(page: WorkshopDocument) {
    return this.apiCall<WorkshopDocument>('/navigation/page/create-page', page);
  }
      
  deletePage(page: WorkshopDocument) {
    return this.apiCall<WorkshopDocument>('/navigation/page/delete-page-and-update-category', page);
  }
      
  editPageNameAndSummary(page: WorkshopDocument) {
    return this.apiCall<Workshop>('/navigation/page/edit-page-name-update-category', page);
  }
      
  sortPages(pages: WorkshopDocument[], categoryId: string = '') {
  const params = new HttpParams().set('categoryId', categoryId);
    return this.apiCall<WorkshopDocument[]>('/navigation/page/sort-pages', pages, 'post', params);
  }
}
