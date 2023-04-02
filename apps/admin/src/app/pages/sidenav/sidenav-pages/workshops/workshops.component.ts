import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest, map, of, switchMap, } from 'rxjs';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { PageListComponent } from './workshops-sidepanel/page-list-controls/page-list.component';
import { WorkshopListComponent } from './workshops-sidepanel/workshop-list-controls/workshop-list.component';

@Component({
  standalone: true,
  selector: 'ngx-workshops',
  template: `
  <ng-container *ngIf="viewModel | async as vm; else loading">

    <router-outlet
      (activate)="routerIsActivate = true"
      (deactivate)="routerIsActivate = false">
    </router-outlet>

    <h1 *ngIf="!routerIsActivate" class="select-a-category-placeholder">Select a Category</h1>
    
    <div class="workshop-controls-panel">
      <div class="controls">
        <ngx-workshop-list [workshops]="vm.workshops"></ngx-workshop-list>
        <ngx-page-list [documents]="vm.documents"></ngx-page-list>
      </div>
    </div>

  </ng-container>
  <ng-template #loading>
    loading...
  </ng-template>
  `,
  styles: [`
    :host {
      grid-template-columns: 0 calc(100vw - 558px) auto;
      display: grid;
      .select-a-category-placeholder{
        padding: 50px;
      }
    }
    .workshop-controls-panel {
      position: sticky;
      top: 0;
      height: calc(100vh - 56px);
      width: 315px;
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    PageListComponent,
    WorkshopListComponent,
    MatSnackBarModule
  ]
})
export class WorkshopsComponent {
  routerIsActivate = false;
  navigationService = inject(NavigationService);
  viewModel = combineLatest({
    workshops: this.navigationService.getWorkshops(),
    workshop: this.navigationService.getCurrentWorkshop()  
  })
  .pipe(
    map(({ workshops, workshop }) => {
      console.log('workshop', workshop);

      return {
        workshops: workshops?.sort((a, b) => a.sortId - b.sortId),
        documents: workshop?.workshopDocuments || []
      };
    })
  )
}
