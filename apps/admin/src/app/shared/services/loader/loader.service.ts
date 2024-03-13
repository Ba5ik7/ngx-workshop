import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private overlayRef: OverlayRef | null = null;
  private spinnerTopRef = new Subject<boolean>();

  constructor(private overlay: Overlay) {
    this.spinnerTopRef.asObservable().pipe(
    ).subscribe((res) => {
      if (res) {
        this.showSpinner();
      } else if (this.overlayRef) {
        this.overlayRef.detach();
      }
    });
  }

  private showSpinner() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
    }

    // primary
    if (!this.overlayRef.hasAttached()) {
      const spinnerOverlayPortal = new ComponentPortal(MatProgressSpinner);
      const spinnerOverlayComponent = this.overlayRef.attach(spinnerOverlayPortal);
      spinnerOverlayComponent.instance.diameter = 100;
      spinnerOverlayComponent.instance.color = 'accent';
      spinnerOverlayComponent.instance.mode = 'indeterminate';
    }
  }

  public show() {
    this.spinnerTopRef.next(true);
  }

  public hide() {
    this.spinnerTopRef.next(false);
  }
}
