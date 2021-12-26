import * as spinner from './spinner.actions'

export interface State {
  isOn: boolean;
}

export const initialState: State = {
  isOn: false
};

export function reducer(state = initialState, action: spinner.Actions): State {
  switch (action.type) {
    case spinner.startSpinner: {
      return {
        isOn: true
      };
    }

    case spinner.stopSpinner: {
      return {
        isOn: false
      };
    }

    default:
      return state;
  }
}

//export const getSpinner = (state: State) => state.isOn;