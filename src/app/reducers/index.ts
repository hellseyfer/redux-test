/* 
Our index.ts file in our event state folder is our public API.

This is a difficult task as most applications lazily load the majority of their state, 
meaning we can only specify the state that is always loaded when the app loads. 
We can then extend our feature state objects to have these "global" state reducers. */

import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../core/state/index';

/* ------------------------------- */
/* Global States */
/* ------------------------------- */

export interface State {
  spinner: fromRoot.SpinnerReducer.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
 export const reducers: ActionReducerMap<State> = {
    spinner: fromRoot.SpinnerReducer.reducer,
  };

//Selectors
/*  When using the createSelector and createFeatureSelector functions @ngrx/store keeps track of the latest arguments in which your selector function was invoked. 
 Because selectors are pure functions, the last result can be returned when the arguments match without re-invoking your selector function. 
 This can provide performance benefits, particularly with selectors that perform expensive computation. This practice is known as memoization. */

 export const getSpinner = fromRoot.SpinnerSelectors.getSpinner;

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
