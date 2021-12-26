import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models';
import { getSpinner } from 'src/app/reducers';
import { EventService } from '../../services/event.service';
import { LoadAttendees } from '../../state/attendees/attendees.actions';
import { getAttendees } from '../../state/attendees/attendee.selectors';
import { StartSpinner, StopSpinner } from 'src/app/core/state/spinner/spinner.actions';
import { EventState } from '../../state';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  spinner$: Observable<boolean>;
  attendees$: Observable<Attendee[]>;
    
  constructor(private _es: EventService, private store: Store<EventState>) { }

  ngOnInit() {
    this.spinner$ = this.store.pipe(select(getSpinner));
    this.attendees$ = this.store.pipe(select(getAttendees));
    this.store.dispatch(new LoadAttendees());
  }

  addAttendee(attendee: Attendee) {
    this.store.dispatch(new StartSpinner());
    this._es.addAttendee(attendee).subscribe(() => {
      this.store.dispatch(new StopSpinner());
    });
  }

}
