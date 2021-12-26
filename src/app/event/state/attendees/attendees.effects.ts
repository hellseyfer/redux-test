/* Effects are all about listening for actions doing work and dispatching new actions.
 So in our example we will listen for the LoadAttendees action do the work of getting them via a service and then dispatch a LoadAttendeesSuccess action. */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { EventService } from '../../services/event.service';
import {
  AttendeesActionTypes,
  LoadAttendees,
  LoadAttendeesSuccess,
  LoadAttendeesFail,
} from './attendees.actions';
import { Attendee } from '../../../models';

@Injectable()
export class AttendeesEffects {
  constructor(private actions$: Actions, private eventService: EventService) {} // Inject the actions observable from NgRx that will emit each action dispatched in our application and the EventService to get the attendees.

  getAttendees$ = createEffect(() => {
    return this.actions$.pipe(        
      ofType(AttendeesActionTypes.LoadAttendees), // List the injected actions and filter on them with the ofType operator from NgRx. 
      switchMap((action: LoadAttendees) =>        // Use the switchMap operator to switch from the actions stream to a new observable returned from our EventService and return an LoadAttendeesSuccess action.
        this.eventService.getAttendees().pipe(
          map((attendees: Attendee[]) => new LoadAttendeesSuccess(attendees)),
          catchError((error) => of(new LoadAttendeesFail(error)))
        )
      )
    );
  });
}
