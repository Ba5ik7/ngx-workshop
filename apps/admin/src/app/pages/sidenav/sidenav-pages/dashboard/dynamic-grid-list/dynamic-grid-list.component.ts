import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

type TCard = {
  title: string;
  cols: number;
  rows: number;
};

@Component({
    imports: [
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        DragDropModule,
        LayoutModule
    ],
    selector: 'ngx-dynamic-grid-list',
    template: `
    <div class="grid-container">
      <mat-grid-list cols="4" rowHeight="350px" cdkDropList (cdkDropListDropped)="onDrop($event)">
        <mat-grid-tile cdkDrag *ngFor="let card of cards | async" [colspan]="card.cols" [rowspan]="card.rows">
          <div class="dashboard-card ngx-mat-card">
            <div class="card-header">
              <div class="card-title">
                {{card.title}}
                <button
                  mat-icon-button class="more-button"
                  [matMenuTriggerFor]="menu"
                  aria-label="Toggle menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" xPosition="before">
                  <button mat-menu-item (click)="thinOrWide(card)">{{ card.cols === 1 ? 'Wide' : 'Thin' }}</button>
                  <button mat-menu-item (click)="shortOrTall(card)">{{ card.rows === 1 ? 'Tall' : 'Short' }}</button>
                  <button mat-menu-item>Remove</button>
                </mat-menu>
              </div>
            </div>
            <div class="dashboard-card-content">
              <div>Card Content Here</div>
            </div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
    styles: [`
    .grid-container { margin: 20px; }

    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;

      .card-header {
        padding: 25px;
        // border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // .card-title { font-size: 1.2em; }
      }
    }
    .more-button {
      position: absolute;
      top: 5px;
      right: 10px;
    }
    .dashboard-card-content { text-align: center; }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridListComponent {

  cardsSubject = new BehaviorSubject<TCard[]>([
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ]);

  cards = this.cardsSubject.asObservable();

  thinOrWide(card: TCard) {
    card.cols = card.cols === 2 ? 1 : 2;
  }

  shortOrTall(card: TCard) {
    card.rows = card.rows === 2 ? 1 : 2;
  }

  onDrop(event: CdkDragDrop<{ previousIndex: number, currentIndex: number }[]>) {
    const cards = this.cardsSubject.getValue();
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const card = cards[previousIndex];
    cards.splice(previousIndex, 1);
    cards.splice(currentIndex, 0, card);
    this.cardsSubject.next(cards);
  }
}
