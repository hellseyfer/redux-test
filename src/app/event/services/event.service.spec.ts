import { inject, TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Attendee } from 'src/app/models';

describe('EventService', () => {
  let httpTestingController: HttpTestingController;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService],
    });
    eventService = TestBed.get(EventService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));

  it('can test HttpClient.get attendees', () => {
    const testAttendees: Attendee[] = [
      {
        name: 'Test Data',
        attending: true,
        guests: 1,
      },
    ];

    eventService.getAttendees().subscribe();

    const req = httpTestingController.expectOne('/api/attendees');

    expect(req.request.method).toEqual('GET');

    req.flush(testAttendees);

    httpTestingController.verify();

  });
});
