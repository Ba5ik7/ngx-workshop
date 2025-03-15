import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ngx-footer',
  template: `
  <footer class="footer">
    <a class="docs-footer-greeting"
      href="https://github.com/Ba5ik7/ngx-workshop"
      target="_blank"
      aria-label="GitHub Repository">

<svg width="12" height="12" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z"  /></svg>
      <!-- <img
        class="workshop-logo docs-footer-github-logo"
        src="/assets/img/github-circle-white-transparent.svg"
        alt="github"> -->
      Made with ❤️
    </a>
  </footer>
  `,
  styles: [`
    footer {
      // height: 44px;
      padding: 6px;
      text-align: right;
      background-color: var(--mat-sys-on-primary-container);
      color: var(--mat-sys-primary-container);
      .docs-footer-greeting {
        font-size: 9px;
        font-weight: 400;
        text-decoration: none;
        color: var(--mat-sys-primary-container);
        svg path {
          fill: var(--mat-sys-primary-container);
        }
      }
    }
  `],
})
export class FooterComponent { }
