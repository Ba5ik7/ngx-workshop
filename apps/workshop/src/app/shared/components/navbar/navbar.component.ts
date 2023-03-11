import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserStateService } from '../../services/user-state/user-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  sections$ = this.navigationService.sections$;
  signedIn$ = this.userStateService.signedIn$;

  constructor(
    private navigationService: NavigationService,
    private userStateService: UserStateService
  ) { }

  openDialog(): void {
    this.userStateService.openSignInModal.next(true);
  }
}
