import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { WebstorageService } from '../webstorage/webstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private localStoarge: WebstorageService) { }

  setUserToken(user: IUser) {
    this.localStoarge.setLocalstorageItem({ key: 'user', value: JSON.stringify(user) });
  }

  getUserToken(): IUser | null {
    const user = this.localStoarge.getLocalstorageItem('user')?.value;
    try {
      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  }
}
