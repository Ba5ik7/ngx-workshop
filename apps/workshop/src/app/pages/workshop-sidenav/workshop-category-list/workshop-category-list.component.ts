import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-category-list',
  templateUrl: './workshop-category-list.component.html',
  styleUrls: ['./workshop-category-list.component.scss']
})
export class WorkshopCategoryListComponent {

  categories!: Observable<Category[]>;

  constructor(navigationService: NavigationService) {
    navigationService.categoryRouteSub.next('categories');
    this.categories = navigationService.categories$;
  }
}
