import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workshop, WorkshopDocument, WorkshopDocumentIdentifier } from '../../interfaces/category.interface';

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

  // ! Worst place to put this, it saves the HTML of the editor
  savePageHTMLSuccessSubject = new Subject<boolean>();
  savePageHTMLErrorSubject = new Subject<boolean>();
  saveEditorDataSubject = new Subject<boolean>();
  saveEditorData$ = this.saveEditorDataSubject.asObservable();
  savePageHTML(html: string, _id: string) {
    return this.apiCall<WorkshopDocument>('/workshop/update-workshop-html', { _id, html });
  }
  

  private apiCall<T>(url: string, body: unknown, method: 'post' | 'get' = 'post', params?: HttpParams) {
    const request = this.httpClient.request<T>(method, this.baseUrl + url, {
      body,
      params,
    });

    return request.pipe(
      map((data: T) => ({ success: data } as Result<T>)),
    );
  }

  createWorkshop(workshop: Workshop) {
    return this.apiCall<Workshop>('/navigation/workshop/create-workshop', workshop);
  }

  editWorkshopNameAndSummary(workshop: Workshop) {
    return this.apiCall<Workshop>('/navigation/workshop/edit-workshop-name-and-summary', workshop);
  }

  deleteWorkshop(_id: string) {
    return this.apiCall<{ id: string }>('/navigation/workshop/delete-workshop-and-workshop-documents', { _id });
  }

  sortWorkshops(workshop: Workshop[]) {
    return this.apiCall<Workshop[]>('/navigation/workshop/sort-workshops', workshop);
  }

  createPage(page: WorkshopDocument, workshopId: string) {
    return this.apiCall<WorkshopDocument>('/navigation/page/create-page', { page, workshopId });
  }

  deletePage(page: WorkshopDocument, workshopId: string) {
    return this.apiCall<WorkshopDocument>('/navigation/page/delete-page-and-update-workshop', { page, workshopId });
  }

  editPageName(page: WorkshopDocument) {
    return this.apiCall<Workshop>('/navigation/page/edit-page-name-update-workshop', page);
  }

  sortDocuments(pages: WorkshopDocumentIdentifier[], workshopId: string) {
    const params = new HttpParams().set('workshopId', workshopId);
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
