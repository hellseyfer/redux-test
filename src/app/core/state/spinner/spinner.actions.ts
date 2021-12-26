/* Make action creators to strongly type our actions.
 */
import { Action } from '@ngrx/store';

/* export enum ActionTypes {
  StartSpinner = '[Spinner Page] Start Spinner',
  StopSpinner = '[Spinner Page] Stop Spinner'
}
 */

export const  startSpinner = '[Spinner Page] Start Spinner';
export const stopSpinner = '[Spinner Page] Stop Spinner';

export class StartSpinner implements Action {
  readonly type = startSpinner;
}

export class StopSpinner implements Action {
  readonly type = stopSpinner;
}

export type Actions = StopSpinner | StartSpinner;
