import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EventComponent } from './event.component';
import { EventService } from '../../services/event.service';
import { BehaviorSubject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { State } from '../../state';
import { Attendee } from 'src/app/models';

//import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let service: EventService;
  let store: Store<State>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: null },
        {
          provide: EventService,
          useValue: {
            getAttendees: () => {}
          }
        },
        {
          provide: Store,
          useValue: {
            pipe: () => {},
            dispatch: () => jest.fn()
          }
        }
      ],
      declarations: [EventComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EventService);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of attendees set', () => {

    const subject = new BehaviorSubject<Attendee[]>(null);

    const fakeAttendees = [{ name: 'FAKE_NAME', attending: false, guests: 0 }];

    jest.spyOn(store, 'pipe').mockImplementation(() => subject);

    subject.next(fakeAttendees);

    component.ngOnInit();

    component.attendees$.subscribe(attendees => {
      expect(attendees).toEqual(fakeAttendees);
    });
  });


});

