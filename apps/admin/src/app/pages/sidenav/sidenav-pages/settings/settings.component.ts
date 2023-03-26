import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'ngx-settings',
  template: `<h1>Settings</h1>`,
})
export class SettingsComponent implements OnInit {
  navigationService = inject(NavigationService);
  ngOnInit(): void {
    this.navigationService.sectionRouteSub.next('settings');
  }
}
