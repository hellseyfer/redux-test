import { Attendee } from 'src/app/models';
import { AttendeesActions, AttendeesActionTypes } from './attendees.actions';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Attendee> {
  //attendees: Attendee[];
  loading: boolean;
  error: any;
  filterBy: string;
}

/* The entity adapter will allow us to take a collection and manage it with a set of Adapter Collection Methods. 
The entity adapter also provides methods for operations against an entity. 
These methods can change one to many records at a time. Each method returns the newly modified state if changes were made and the same state if no changes were made. */

const adapter: EntityAdapter<Attendee> = createEntityAdapter<Attendee>();

export const intitalState: State = adapter.getInitialState({
  //attendees: [],
  loading: false,
  error: null,
  filterBy: 'all'
});

export function reducer(state = intitalState, action: AttendeesActions): State {
  switch (action.type) {
    case AttendeesActionTypes.LoadAttendees: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: null,
      });
    }
    case AttendeesActionTypes.LoadAttendeesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        //attendees: action.payload,
        error: null,
      });
    }

    case AttendeesActionTypes.LoadAttendeesFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }

    case AttendeesActionTypes.AddAttendeeSuccess: {
      return adapter.addOne(action.payload, { ...state, error: null });
    }

    case AttendeesActionTypes.AddAttendeeFail: {
      return { ...state, error: action.payload };
    }

    case AttendeesActionTypes.FilterBy: {
      return { ...state, filterBy: action.payload };
    }
    
    default: {
      return state;
    }
  }
}
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

