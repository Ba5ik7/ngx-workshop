import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'ngx-not-found',
  template: `
    <main>
      <div class="wrapper">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 200 200"
          xml:space="preserve">
        <path class="shield-left" d="M5.7,33.2L98.8,0l95.5,32.6l-15.4,123.1L98.8,200L20,156.3L5.7,33.2z"/>
        <path class="shield-right" d="M194.3,32.6L98.8,0v200l80.1-44.3L194.3,32.6L194.3,32.6z"/>
        <circle class="eye" cx="61.7" cy="80" r="10.7"/>
        <circle class="eye" cx="138.3" cy="80" r="10.7"/>
        <path
          class="frown"
          stroke-width="10"
          stroke-linecap="round"
          fill="none"
          d="M138,130.6c0,0-33.5-42.5-76,0"/>
        </svg>

        <div>
          <h1>Page Not Found</h1>
          <p>We're sorry. The page you are looking for cannot be found.</p>
          <a routerLink="/" mat-raised-button color="primary">Go Home</a>
          <a routerLink="/guides" mat-raised-button>Read Guides</a>
        </div>
      </div>
    </main>

    <ngx-footer></ngx-footer>
  `,
  styles: [`
    $vertical-spacing: 64px;
    $horizontal-spacing: 32px;

    main {
      min-height: 100vh;
      font-size: 1.25rem;
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: $vertical-spacing;
    }

    svg {
      height: 300px;
      max-width: 100%;
      margin-right: $horizontal-spacing;
    }

    a + a { margin-left: 16px; }

    @media (max-width: 720px) {
      .wrapper { flex-direction: column; }
      svg {
        height: auto;
        max-height: 300px;
        margin-right: 0;
        margin-bottom: $vertical-spacing;
      }
    }
  `],

  imports: [
    CommonModule,
    MatButtonModule,
    FooterComponent,
  ],
})
export class NotFoundComponent {
  @HostBinding('class.main-content') readonly mainContentClass = true;
}
