// import { CdkPortalOutlet, ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  // ApplicationRef,
  Component,
  // ComponentFactoryResolver,
  // ElementRef,
  // Injector,
  Input,
  OnDestroy,
  OnInit,
  SecurityContext,
  // ViewContainerRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxEditorjsOutputBlock } from '@tmdjr/ngx-editorjs';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../../services/workshops/workshops.service';

import { WorkshopDocument } from '../../interfaces/workshop-document.interface';
// import { CodeHighlighterComponent } from '../code-highlighter/code-highlighter.component';
// import { LiveExampleComponent } from './live-example/live-example.component';
// import { NextPageComponent } from './next-page/next-page.component';
import { WorkshopViewerService } from './workshop-viewer.service';


@Component({
  selector: 'ngx-workshop-viewer-terrence-dusell',
  templateUrl: './workshop-viewer.component.html',
  styleUrls: ['./workshop-viewer.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class WorkshopViewerComponent implements OnDestroy {

  currentDocument!: string

  pageNotFound =  false;

  @Input()
  set workshopDocument(currentDocument: string | null) {
    if(currentDocument === null || currentDocument === undefined) {
      this.pageNotFound = true;
      return;
    }
    this.currentDocument = currentDocument;
    this.fetchWorkshopDocuments();
  }
  
  destory: Subject<boolean> = new Subject();

  dataHtml!: string;

  blocks!: NgxEditorjsOutputBlock[];

  requestValue = this.workshopEditorService.saveEditorDataSubject;

  constructor(
    private workshopViewerService: WorkshopViewerService,
    private workshopEditorService: WorkshopEditorService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  private fetchWorkshopDocuments():void {
    // this.workshopViewerService.fetchWorkshop(`/api/workshop/${this.currentDocument}`)
    // .pipe(takeUntil(this.destory))
    // .subscribe((data) => {
    //   this.correctUrlPaths(data);
    //   this.blocks = JSON.parse(data.html);      
    // });
  }

  private correctUrlPaths(data: WorkshopDocument): void {
    data.html = data.html.replace(/href="#([^"]*)"/g, (_m: string, fragmentUrl: string) => {
      const absoluteUrl = `${location.pathname}#${fragmentUrl}`;
      return `href="${this.domSanitizer.sanitize(SecurityContext.URL, absoluteUrl)}"`;
    });
  }

  valueRequested(value: any): void {
    console.log({ value });
    this.workshopEditorService.savePageHTML(JSON.stringify(value), this.currentDocument);
  }
}
