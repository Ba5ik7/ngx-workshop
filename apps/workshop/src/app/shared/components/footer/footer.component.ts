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
      <img
        class="workshop-logo docs-footer-github-logo"
        src="/assets/img/github-circle-white-transparent.svg"
        alt="github">
      Made with ❤️
    </a>
  </footer>
  `,
  styles: [`
    footer {
      height: 44px;
      padding: 6px;
      text-align: right;
      .docs-footer-greeting {
        font-size: 9px;
        text-decoration: none;
        color: #fff;
        img {
          width: 14px;
          vertical-align: text-bottom;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { }
