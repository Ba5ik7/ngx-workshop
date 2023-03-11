import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(navigationService: NavigationService) {
    navigationService.sectionRouteSub.next('dashboard');
  }

  ngOnInit(): void {
  }

}
