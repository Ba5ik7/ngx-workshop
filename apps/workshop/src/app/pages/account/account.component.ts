import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
