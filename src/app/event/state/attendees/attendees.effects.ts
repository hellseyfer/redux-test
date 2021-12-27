/* Effects are all about listening for actions doing work and dispatching new actions.
 So in our example we will listen for the LoadAttendees action do the work of getting them via a service and then dispatch a LoadAttendeesSuccess action. */

import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { EventService } from '../../services/event.service';
import {
  AttendeesActionTypes,
  LoadAttendees,
  LoadAttendeesSuccess,
  LoadAttendeesFail,
  AddAttendee,
  AddAttendeeSuccess,
  AddAttendeeFail,
  FilterBy,
} from './attendees.actions';
import { Attendee } from '../../../models';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class AttendeesEffects {
  constructor(private actions$: Actions, private eventService: EventService) {} // Inject the actions observable from NgRx that will emit each action dispatched in our application and the EventService to get the attendees.

  getAttendees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttendeesActionTypes.LoadAttendees), // List the injected actions and filter on them with the ofType operator from NgRx.
      switchMap(
        (
          action: LoadAttendees // Use the switchMap operator to switch from the actions stream to a new observable returned from our EventService and return an LoadAttendeesSuccess action.
        ) =>
          this.eventService.getAttendees().pipe(
            map((attendees: Attendee[]) => new LoadAttendeesSuccess(attendees)),
            catchError((error) => of(new LoadAttendeesFail(error)))
          )
      )
    );
  });

  addAttendee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttendeesActionTypes.AddAttendee),
      switchMap((action: AddAttendee) =>
        this.eventService.addAttendee(action.payload).pipe(
          map((attendee: Attendee) => new AddAttendeeSuccess(attendee)),
          catchError((error) => of(new AddAttendeeFail(error)))
        )
      )
    );
  });

  loadDiaryHealthActions$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((r: RouterNavigationAction) => ({
      url: r.payload.routerState.url,
      filterBy: r.payload.routerState.root.queryParams['filterBy']
    })),
    filter(({ url, filterBy }) => url.startsWith('/event')),
    map(({ filterBy }) => new FilterBy(filterBy))
  )});

}
