import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'ngx-home',
    host: { class: 'main-content' },
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        RouterModule,
        MatIconModule,
        FooterComponent
    ]
})
export class HomeComponent {}
