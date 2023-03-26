import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'ngx-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

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
