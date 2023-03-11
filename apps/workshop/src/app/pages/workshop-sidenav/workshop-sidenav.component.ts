import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { distinct, map, Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../shared/interfaces/category.interface';
import { filterNullish, NavigationService } from '../../shared/services/navigation/navigation.service';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'workshop-sidenav',
  templateUrl: './workshop-sidenav.component.html',
  styleUrls: ['./workshop-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkshopSidenavComponent implements OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isScreenSmall: Observable<boolean>;
  isExtraScreenSmall: Observable<boolean>;
  destory: Subject<boolean> = new Subject();

  section!: Observable<string>;
  sectionTitle!: Observable<string>;
  categoryTitle!: Observable<string>;
  headerSvgPath!: Observable<string>;
  categories!: Observable<Category[]>;

  constructor(breakpoints: BreakpointObserver,
              activatedRoute: ActivatedRoute,
              navigationService: NavigationService) {

    this.isExtraScreenSmall =
    breakpoints
    .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
    .pipe(map(breakpoint => breakpoint.matches));

    this.isScreenSmall = breakpoints
    .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
    .pipe(map(breakpoint => breakpoint.matches));

    activatedRoute.params
    .pipe(takeUntil(this.destory), distinct())
    .subscribe(params => navigationService.sectionRouteSub.next(params['section']));

    this.section = navigationService.sectionRoute$;
    this.categories = navigationService.categories$
    .pipe(
      filterNullish(),
      map((categories: Category[]) => categories.sort((a, b) => a.sortId - b.sortId))
    );
    this.sectionTitle = navigationService.sectionTitle$;
    this.headerSvgPath = navigationService.headerSvgPath$;
    this.categoryTitle = navigationService.categoryTitle$;
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
