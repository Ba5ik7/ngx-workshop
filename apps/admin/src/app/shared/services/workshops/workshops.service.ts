import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workshop, WorkshopDocument } from '../../interfaces/category.interface';

export interface Result<T> {
  success?: T;
  error?: number;
}

export type KeyValue = { [key: string]: string };

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
    return this.apiCall<{ id: string }>('/navigation/category/delete-category-and-workshops', { _id });
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

  ifErrorsSetMessages(formGroup: FormGroup, formControlMessages: KeyValue, errorMessages: KeyValue): boolean {
    let errorMessage = false;
    Object.keys(formGroup.controls).forEach(element => {
      const errors = formGroup.get(element)?.errors;
      if(errors) {
        errorMessage = true;
        formControlMessages[element] = errorMessages[Object.keys(errors)[0]];
      }
    });
    return errorMessage;
  }
}
