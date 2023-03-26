import { Component, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreateSectionModalComponent } from './create-section-modal/create-section-modal.component';
import { DeleteSectionModalComponent } from './delete-section-modal/delete-section-modal.component';

@Component({
  selector: 'ngx-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class WorkshopMenuComponent {

  @Input() sections!: any[] | null;

  constructor(public matDialog: MatDialog) { }

  deleteSection(event: Event, navItem: any): void {
    event.preventDefault();
    // EDIT: Looks like you also have to include Event#stopImmediatePropagation as well
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteSectionModalComponent, { width: '400px', data: { navItem }});
  }

  createSection(): void {
    this.matDialog.open(CreateSectionModalComponent, { width: '500px' });
  }
}
