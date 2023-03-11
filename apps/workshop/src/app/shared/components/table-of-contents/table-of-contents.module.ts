import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TableOfContentsComponent} from './table-of-contents';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TableOfContentsComponent],
  exports: [TableOfContentsComponent]
})
export class TableOfContentsModule { }
