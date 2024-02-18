import { Component, HostBinding } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterModule,
    FooterComponent
  ]
})
export class HomeComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
