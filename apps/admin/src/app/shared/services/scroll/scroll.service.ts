import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject: Subject<Event> = new Subject();
  onScroll$ = this.scrollSubject.asObservable();

  public attachScrollListener(elementRef: ElementRef<HTMLElement>) {
    elementRef.nativeElement.addEventListener('scroll', (event: Event) => {
      this.scrollSubject.next(event);
    }, { passive: true });
  }

  public detachScrollListener(elementRef: ElementRef<HTMLElement>) {
    elementRef.nativeElement.removeEventListener('scroll', (event: Event) => {
      this.scrollSubject.next(event);
    });
  }
}
