import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenaiWorkshopCreatorComponent } from './openai-workshop-creator.component';

describe('OpenaiWorkshopCreatorComponent', () => {
  let component: OpenaiWorkshopCreatorComponent;
  let fixture: ComponentFixture<OpenaiWorkshopCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenaiWorkshopCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenaiWorkshopCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
