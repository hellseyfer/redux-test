import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  attendees$!: Observable<Attendee[]>;
    
  constructor(private _es: EventService) { }

  ngOnInit(): void {
    this.getAttendees();
  }

  getAttendees() {
    this.attendees$ = this._es.getAttendees();
  }

  addAttendee(attendee: Attendee) {
    this._es
      .addAttendee(attendee)
      .subscribe(() => this.getAttendees());
  }
}
