import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
