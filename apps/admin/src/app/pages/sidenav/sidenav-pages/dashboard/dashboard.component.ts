import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicGridListComponent } from './dynamic-grid-list/dynamic-grid-list.component';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';



@Component({
  standalone: true,
  selector: 'ngx-dashboard',
  imports: [
    CommonModule,
    DynamicGridListComponent,
  ],
  template: `<ngx-dynamic-grid-list></ngx-dynamic-grid-list>`,
  styles: [`:host { width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  constructor(navigationService: NavigationService) {
    navigationService.sectionRouteSub.next('dashboard');
  }
}
