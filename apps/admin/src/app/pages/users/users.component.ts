import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(navigationService: NavigationService) {
    navigationService.sectionRouteSub.next('users');
  }

  ngOnInit(): void {
  }

}
