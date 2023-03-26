import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  standalone: true,
  selector: 'ngx-delete-section-modal',
  template: `
    <h2 mat-dialog-title>Delete the {{data.navItem.name}} Section?</h2>
    <h3 class="warn">This action cannot be undone.</h3>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
      <button mat-flat-button color="warn" (click)="deleteSection()">Delete</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ MatDialogModule ]
})
export class DeleteSectionModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { navItem: any },
    private dialogRef: MatDialogRef<DeleteSectionModalComponent>
    ) { }

  deleteSection() {
    console.log(this.data);
    this.dialogRef.close();
  }
}
