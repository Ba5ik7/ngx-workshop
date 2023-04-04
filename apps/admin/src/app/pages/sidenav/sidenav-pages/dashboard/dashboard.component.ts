import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicGridListComponent } from './dynamic-grid-list/dynamic-grid-list.component';

@Component({
  standalone: true,
  selector: 'ngx-dashboard',
  imports: [DynamicGridListComponent],
  template: `<ngx-dynamic-grid-list></ngx-dynamic-grid-list>`,
  styles: [`:host { width: 100%; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
