import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'workshop-menu',
  templateUrl: './workshop-menu.component.html',
  styleUrls: ['./workshop-menu.component.scss']
})
export class WorkshopMenuComponent {

  @Input() signedIn!: Observable<boolean>;
  @Input() categories!: any[] | null;
  @Input() section!: string | null;
}
