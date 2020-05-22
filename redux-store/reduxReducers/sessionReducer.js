/* @flow */

export const SESSION = Object.freeze({
  SET_SESSION: 'SET_SESSION',
  RESET_SESSION: 'RESET_SESSION',
});

// type State = {
//   trucks: Array<Object>
// };

const INITIAL_STATE = {
  loggedIn: false
};

// type Action = {
//   type: string,
//   trucks: Array<Object>
// };

export const setSession = () => ({
  type: SESSION.SET_SESSION
});

export const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION.SET_SESSION: 
      return {
        ...state,
        loggedIn: true
      }
    default:
      return state;
  }
};
