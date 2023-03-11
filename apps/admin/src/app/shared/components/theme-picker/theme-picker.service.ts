import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorage, WebstorageService } from '../../services/webstorage/webstorage.service';

@Injectable()
export class ThemePickerService {
  static THEME_EXAMPLE_ICON = 'assets/img/theme-demo-icon.svg';
  static DEFAULT_THEME = 'indigo-pink';
  static STRORAGE_KEY: string = 'theme-picker-current-name';
  static NOT_FOUND: string = 'NOT_FOUND';

  constructor(@Inject(DOCUMENT) private document: Document, private webstorageService: WebstorageService ) { }

  storeTheme(theme: string): void {
    this.webstorageService.setLocalstorageItem({ key: ThemePickerService.STRORAGE_KEY, value: theme });
  }
  
  getStoredThemeName(): LocalStorage {
    return this.webstorageService.getLocalstorageItem(ThemePickerService.STRORAGE_KEY);
  }

  setStyle(key: string, href: string): void {
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string): void {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string): HTMLLinkElement {
    return this.getExistingLinkElementByKey(key) ?? this.createLinkElementWithKey(key);
  }
  
  private getExistingLinkElementByKey(key: string): HTMLLinkElement | null {
    return this.document.head.querySelector(`link[rel="stylesheet"].style-manager-${key}`);
  }
  
  private createLinkElementWithKey(key: string): HTMLLinkElement {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(`style-manager-${key}`);
    this.document.head.appendChild(linkEl);
    return linkEl;
  }
}
