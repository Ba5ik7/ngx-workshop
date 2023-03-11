import { Injectable } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';


export interface LocalStorage {
  key: string,
  value: any
}

export interface SessionStorage {
  key: string,
  value: any
}


@Injectable({
  providedIn: 'root'
})
export class WebstorageService {

  LOCAL_STORAGE_ITEM_NOT_FOUND_ERROR = 'LOCAL_STORAGE_ITEM_NOT_FOUND_ERROR';
  LOCAL_STORAGE_MAX_SIZE_REACHED = 'LOCAL_STORAGE_MAX_SIZE_REACHED';

  localStorageValueChangeSub: Subject<LocalStorage> = new Subject();
  localStorageValueChange$: Observable<LocalStorage> = this.localStorageValueChangeSub.asObservable();

  getLocalStorageSize(): number {
    return new Blob(Object.values(localStorage)).size;
  }

  getLocalstorageItem(key: string): LocalStorage {
    const item = { key, value: localStorage.getItem(key) ?? this.LOCAL_STORAGE_ITEM_NOT_FOUND_ERROR };
    this.localStorageValueChangeSub.next(item);
    return item;
  }
  
  setLocalstorageItem({ key, value }: LocalStorage): void {
    localStorage.setItem(key, value);
    this.localStorageValueChangeSub.next({ key, value });
  }
  
  removeLocalstorageItem(key: string): void {
    const item = { key, value: localStorage.getItem(key) ?? this.LOCAL_STORAGE_ITEM_NOT_FOUND_ERROR };
    item.value !== this.LOCAL_STORAGE_ITEM_NOT_FOUND_ERROR && localStorage.removeItem(key); 
    this.localStorageValueChangeSub.next(item);
  }

  clearLocalstorage(): void {
    localStorage.clear();
  }

  SESSION_STORAGE_ITEM_NOT_FOUND_ERROR = 'SESSION_STORAGE_ITEM_NOT_FOUND_ERROR';
  SESSIONSTORAGE_MAX_SIZE_REACHED = 'SESSIONSTORAGE_MAX_SIZE_REACHED';

  sessionStorageValueChangeSub: Subject<SessionStorage> = new Subject();
  sessionStorageValueChange$: Observable<SessionStorage> = this.sessionStorageValueChangeSub.asObservable();

  getSessionStorageSize(): number {
    return new Blob(Object.values(sessionStorage)).size;
  }

  getSessionStorageItem(key: string): SessionStorage {
    const item = { key, value: sessionStorage.getItem(key) ?? this.SESSION_STORAGE_ITEM_NOT_FOUND_ERROR };
    this.sessionStorageValueChangeSub.next(item);
    return item;
  }
  
  setSessionStorageItem({ key, value }: SessionStorage): void {
    sessionStorage.setItem(key, value);
    this.sessionStorageValueChangeSub.next({ key, value });
  }
  
  removeSessionStorageItem(key: string): void {
    const item = { key, value: sessionStorage.getItem(key) ?? this.SESSION_STORAGE_ITEM_NOT_FOUND_ERROR };
    item.value !== this.SESSION_STORAGE_ITEM_NOT_FOUND_ERROR && sessionStorage.removeItem(key); 
    this.sessionStorageValueChangeSub.next(item);
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
