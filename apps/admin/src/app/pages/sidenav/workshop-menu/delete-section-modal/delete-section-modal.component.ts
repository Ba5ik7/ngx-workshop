import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-delete-section-modal',
  templateUrl: './delete-section-modal.component.html',
  styleUrls: ['./delete-section-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteSectionModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { navItem: any },
    private dialogRef: MatDialogRef<DeleteSectionModalComponent>
    ) { }

  ngOnInit(): void {
  }

  deleteSection() {
    console.log(this.data);
    this.dialogRef.close();
  }
}
