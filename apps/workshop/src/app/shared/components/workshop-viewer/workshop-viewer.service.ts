import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
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

    const stream = this.http.get<WorkshopDocument>(url).pipe(shareReplay(1));
    return stream.pipe(tap(() => this.cache[url] = stream));
  }
}
