import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop } from '../../../shared/interfaces/navigation.interface';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-category-list',
  templateUrl: './workshop-category-list.component.html',
  styleUrls: ['./workshop-category-list.component.scss']
})
export class WorkshopCategoryListComponent {

  categories!: Observable<Workshop[]>;

  constructor(navigationService: NavigationService) {
    navigationService.categoryRouteSub.next('categories');
    this.categories = navigationService.categories$;
  }
}
