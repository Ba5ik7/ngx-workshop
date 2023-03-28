import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationService } from './navigation.service';
import { Section, Workshop, WorkshopDocument } from '../../interfaces/category.interface';

describe('NavigationService', () => {
  let service: NavigationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavigationService],
    });

    service = TestBed.inject(NavigationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Tests will go here
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sections', () => {
    const mockSections: Section[] = [{
      "_id": "angular",
      "sectionTitle": "Angular",
      "summary": "Angular Material offers a wide variety of UI components based on the",
      "menuSvgPath": "/assets/img/angular-white-transparent.svg",
      "headerSvgPath": "/assets/img/angular.svg"
    }];

    service.fetchSections().subscribe((sections) => {
      expect(sections.length).toEqual(mockSections.length);
      expect(sections).toEqual(mockSections);
    });

    const req = httpMock.expectOne('/api/navigation/sections');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSections);
  });

  it('should navigate to section and fetch workshops', (done) => {
    const sectionId = 'section1';
    const mockWorkshops: Workshop[] = [{
      "_id": "6311660ba537ae32d742a8fe",
      "sectionId": "angular",
      "sortId": 2,
      "name": "Content Projection Artist",
      "summary": "Let's create better shared Angular components.",
      "workshopDocuments": [
        {
          "_id": "6311660ba537ae32d742a900",
          "name": "Page",
          "sortId": 0
        }
      ],
      "worshopDocumentGroupId": "content-projection-artist",
    }];

    service.navigateToSection(sectionId);

    service.getWorkshops().subscribe((workshops) => {
      expect(workshops.length).toEqual(mockWorkshops.length);
      expect(workshops).toEqual(mockWorkshops);
      done();
    });

    const req = httpMock.expectOne(`/api/navigation/workshops?section=${sectionId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockWorkshops);
  });

  it('should use cached workshops when navigating to the same section again', (done) => {
    const sectionId = 'section1';
    const mockWorkshops: Workshop[] = [{
      "_id": "6311660ba537ae32d742a8fe",
      "sectionId": "angular",
      "sortId": 2,
      "name": "Content Projection Artist",
      "summary": "Let's create better shared Angular components.",
      "workshopDocuments": [
        {
          "_id": "6311660ba537ae32d742a900",
          "name": "Page",
          "sortId": 0
        }
      ],
      "worshopDocumentGroupId": "content-projection-artist",
    }];

    // Navigate to section for the first time
    service.navigateToSection(sectionId);

    service.getWorkshops().subscribe((workshops) => {
      expect(workshops.length).toEqual(mockWorkshops.length);
      expect(workshops).toEqual(mockWorkshops);

      // Navigate to section again
      service.navigateToSection(sectionId);

      service.getWorkshops().subscribe((cachedWorkshops) => {
        expect(cachedWorkshops.length).toEqual(mockWorkshops.length);
        expect(cachedWorkshops).toEqual(mockWorkshops);
        done();
      });
    });

    const req = httpMock.expectOne(`/api/navigation/workshops?section=${sectionId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockWorkshops);
  });
});
