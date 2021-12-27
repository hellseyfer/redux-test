import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models';
import { EventService } from '../../services/event.service';
import { AddAttendee, LoadAttendees } from '../../state/attendees/attendees.actions';
import { getAttendees, getFilteredAttendees } from '../../state/attendees/attendee.selectors';
import { EventState } from '../../state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner$: Observable<boolean>;
  attendees$: Observable<Attendee[]>;
    
  constructor(private _es: EventService, private store: Store<EventState>, private router: Router) { }

  ngOnInit() {
    this.attendees$ = this.store.pipe(select(getFilteredAttendees));
    this.store.dispatch(new LoadAttendees());
  }

  addAttendee(attendee: Attendee) {
    this.store.dispatch(new AddAttendee(attendee));
  }

  navigate(e) {
    const filterBy = e.target.value;
    this.router.navigateByUrl(`/event?filterBy=${filterBy}`);
    this.attendees$ = this.store.pipe(select(getFilteredAttendees));

  }

}
