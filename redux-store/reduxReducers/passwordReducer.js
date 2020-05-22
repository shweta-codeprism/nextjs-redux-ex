import { authRef, singleUserRef, FIREBASE_AUTH_PERSIST } from "@fb/firebase";

const PASSWORD = Object.freeze({
  RESET_PASSWORD: 'RESET_PASSWORD',
  RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR',
});


const INITIAL_STATE = {
  linkSent: false,
  error: {
    flag: false,
    msg: null
  }
}

export const passwordReset = (email) => dispatch => {
  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      dispatch({
        type: PASSWORD.RESET_PASSWORD,
        payload: null
      });
    })
    .catch(error => {
      dispatch({
        type: PASSWORD.RESET_PASSWORD_ERROR,
        payload: error
      });
    });
}



export const passwordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PASSWORD.RESET_PASSWORD:
      return {
        ...state,
        linkSent: true,
        error: {
          flag: false,
          msg: ""
        }
      };

    case PASSWORD.RESET_PASSWORD_ERROR:
      return {
        ...state,
        linkSent: false,
        error: {
          flag: true,
          msg: action.payload
        }
      };
    default:
      return state;
  }
};