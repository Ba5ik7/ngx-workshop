import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextPageComponent {

  @Output() nextClick = new EventEmitter<string>();

  @Input() title?: string;
  @Input() icon?: string;
  @Input() clickEvent?: string;

  handleNextClick(clickEvent: any) {
    this.nextClick.emit(clickEvent);
  }
}
