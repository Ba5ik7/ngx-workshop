import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent {

  sections!: Observable<any[]>;
  sectionTitle!: Observable<string>;
  categoryTitle!: Observable<string>;
  headerSvgPath!: Observable<string>;


  constructor(navigationService: NavigationService) {
    this.sections = navigationService.sections$;
    this.sectionTitle = navigationService.sectionTitle$;
    this.headerSvgPath = navigationService.headerSvgPath$;
    this.categoryTitle = navigationService.categoryTitle$;
  }
}
