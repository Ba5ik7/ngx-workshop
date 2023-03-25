import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'ngx-users',
  template: `<h1>Users Overview</h1>`,
})
export class UsersComponent implements OnInit {
  navigationService = inject(NavigationService);
  ngOnInit(): void {
    this.navigationService.sectionRouteSub.next('users');
  }
}
