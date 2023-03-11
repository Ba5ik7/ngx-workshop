import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;

}
