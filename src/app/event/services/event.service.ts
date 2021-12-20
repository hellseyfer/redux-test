import { Injectable } from '@angular/core';
import { Attendee } from '../../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

/*   //return hardcoded observable
  getAttendees(): Observable<Attendee[]> {
    return of([
      {
        name: 'Duncan',
        attending: true,
        guests: 0
      }
    ] as Attendee[]);
  } */

  getAttendees(): Observable<Attendee[]> {
    return this.httpClient.get<Attendee[]>('/api/attendees');
  }

  addAttendee(attendee: Attendee): Observable<Attendee> {
    return this.httpClient.post<Attendee>('/api/attendees', attendee);
  }
}