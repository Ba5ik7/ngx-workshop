import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DynamicGridListComponent } from './dynamic-grid-list/dynamic-grid-list.component';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'ngx-dashboard',
  imports: [DynamicGridListComponent],
  template: `<ngx-dynamic-grid-list></ngx-dynamic-grid-list>`,
  styles: [`:host { width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  navigationService = inject(NavigationService);
  
  ngOnInit(): void {
    this.navigationService.navigateToSection('dashboard');
    this.navigationService.navigateToWorkshop('overview');
  }
}
