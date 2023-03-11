import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { WorkshopDocument } from '../../interfaces/workshop-document.interface';


@Injectable({
  providedIn: 'root'
})
export class WorkshopViewerService {
  private cache: Record<string, Observable<WorkshopDocument>> = {};

  constructor(private http: HttpClient) { }

  fetchWorkshop(url: string): Observable<WorkshopDocument> {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const stream = this.http.get<WorkshopDocument>(url).pipe();
    return stream.pipe(tap(() => this.cache[url] = stream));
  }
}
