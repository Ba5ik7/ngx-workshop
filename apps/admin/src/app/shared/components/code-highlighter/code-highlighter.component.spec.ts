import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeHighlighterComponent } from './code-highlighter.component';

describe('CodeHighlighterComponent', () => {
  let component: CodeHighlighterComponent;
  let fixture: ComponentFixture<CodeHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeHighlighterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
