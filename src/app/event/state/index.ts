/* export * from './attendees/attendee.selectors';
export * from './attendees/attendees.effects';
export * from './attendees/attendees.reducer' */

import { ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../reducers/index';
import * as fromAttendees from './attendees/attendees.reducer';
import { AttendeesEffects } from './attendees/attendees.effects';

export interface EventState {
  attendees: fromAttendees.State;
}

export interface State extends fromRoot.State {
  event: EventState;
}

export const reducers: ActionReducerMap<EventState> = {
  attendees: fromAttendees.reducer
};

export const effects: any[] = [AttendeesEffects];
