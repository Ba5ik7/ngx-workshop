import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'ngx-delete-section-modal',
  template: `
    <h2 mat-dialog-title>Delete the {{data.navItem.name}} Section?</h2>
    <h3 class="warn" mat-dialog-content>This action cannot be undone.</h3>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-flat-button color="warn" (click)="deleteSection()">Delete</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class DeleteSectionModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { navItem: any },
    private dialogRef: MatDialogRef<DeleteSectionModalComponent>
    ) { }

  deleteSection() {
    this.dialogRef.close();
  }
}
