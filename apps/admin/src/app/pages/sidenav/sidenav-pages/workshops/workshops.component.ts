import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, } from 'rxjs';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
// import { PageListComponent } from './workshops-sidepanel/page-list-controls/page-list.component';
import { WorkshopListComponent } from './workshops-sidepanel/workshop-list-controls/workshop-list.component';
import { Workshop } from '../../../../shared/interfaces/category.interface';

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
        <ngx-workshop-list [categories]="vm.workshops"></ngx-workshop-list>
        <!-- <ngx-page-list [pages]="vm.workshopDocuments | async" [currentCategory]="currentCategory | async"></ngx-page-list> -->
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
    // PageListComponent,
    WorkshopListComponent,
    MatSnackBarModule
  ]
})
export class WorkshopsComponent {
  routerIsActivate = false;
  viewModel = inject(NavigationService).getWorkshops()
  .pipe(
    map((workshops: Workshop[]) => {
      return {
        workshops: workshops?.sort((a, b) => a.sortId - b.sortId),
        workshopDocuments: workshops?.map(workshop => workshop.workshopDocuments)
      }
    })
  )
}
