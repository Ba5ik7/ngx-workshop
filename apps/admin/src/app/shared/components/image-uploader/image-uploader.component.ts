import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'ngx-image-uploader',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
    <button  
      mat-mini-fab 
      class="image-block-button mat-elevation-z2"
      (click)="openEditUrlOverlay($event)">
        <mat-icon>edit</mat-icon>
    </button>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent {
  matDialog = inject(MatDialog);
  openEditUrlOverlay(event: MouseEvent) {
    event.stopPropagation();
    this.matDialog.open(UploadImageModalComponent, { width: '400px', height: '400px' });
  }
}

@Component({
    selector: 'ngx-upload-image-modal',
    imports: [CommonModule, ReactiveFormsModule, MatButtonModule, HttpClientModule],
    template: `
    <div class="upload-modal">
      <form [formGroup]="imageUploadForm" (ngSubmit)="uploadImage()">
        <input 
          type="file" 
          formControlName="image" 
          (change)="onFileSelected($event)"
          accept="image/*" 
        />
        <button 
          mat-raised-button 
          color="primary" 
          type="submit" 
          [disabled]="!imageUploadForm.valid">
          Upload
        </button>
      </form>
    </div>
  `,
    styles: [
        `
      .upload-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageModalComponent {
  private dialogRef = inject(MatDialogRef<UploadImageModalComponent>);
  private selectedFile: File | null = null;
  private httpClient = inject(HttpClient);

  imageUploadForm = new FormGroup({
    image: new FormControl<File | null>(null)
  })


  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  uploadImage() {
    if (this.imageUploadForm.valid) {
      const formData = new FormData();
      formData.append('image', this.selectedFile as File);
      this.httpClient.post('/api/uploader/image-upload', formData).subscribe();
      this.dialogRef.close();
    }
  }
}