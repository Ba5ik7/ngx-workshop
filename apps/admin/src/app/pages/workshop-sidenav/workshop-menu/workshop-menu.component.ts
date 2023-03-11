import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreateSectionModalComponent } from './create-section-modal/create-section-modal.component';
import { DeleteSectionModalComponent } from './delete-section-modal/delete-section-modal.component';

@Component({
  selector: 'workshop-menu',
  templateUrl: './workshop-menu.component.html',
  styleUrls: ['./workshop-menu.component.scss']
})
export class WorkshopMenuComponent implements OnInit {

  @Input() sections!: any[] | null;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void { }

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
