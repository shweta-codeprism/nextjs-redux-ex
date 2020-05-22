import { authRef, singleUserRef, FIREBASE_AUTH_PERSIST } from "@fb/firebase";

const AUTH = Object.freeze({
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  USER_SIGN_IN: 'USER_SIGN_IN',
  USER_SIGN_IN_FAILED: 'USER_SIGN_IN_FAILED',
  USER_SIGN_OUT: 'USER_SIGN_OUT',
  CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR'
});


const INITIAL_STATE = {
  info: null,
  loggedIn: false,
  error: {
    flag: false,
    msg: null
  }
}

export const fetchUser = () => dispatch => {
  dispatch({
    type: AUTH.FETCH_USER,
    payload: null
  });
  authRef.onAuthStateChanged(user => {
    if (user) {
      singleUserRef(user.uid).once("value", snapshot => {
        if (snapshot.val() && snapshot.val().isAdmin) {
          dispatch({
            type: AUTH.FETCH_USER_SUCCESS,
            payload: user
          });
        } else {
          authRef
            .signOut()
            .then(() => {
              dispatch({
                type: AUTH.USER_SIGN_IN_FAILED,
                payload: "This login is a valid user but not Admin"
              });
            })
            .catch(error => {
              dispatch({
                type: AUTH.USER_SIGN_IN_FAILED,
                payload: error
              });
            });
        }
      });
    } else {
      dispatch({
        type: AUTH.FETCH_USER_FAILED,
        payload: null
      });
    }
  });
};

export const signIn = (username, password) => dispatch => {
  authRef.setPersistence(FIREBASE_AUTH_PERSIST)
    .then(function () {
      authRef
        .signInWithEmailAndPassword(username, password)
        .then(user => {
          dispatch({
            type: AUTH.USER_SIGN_IN,
            payload: {
              uid: user?.user?.uid,
              email: user?.user?.email,
            }
          });
        })
        .catch(error => {
          dispatch({
            type: AUTH.USER_SIGN_IN_FAILED,
            payload: error
          });
        });
    })
    .catch(function (error) {
      dispatch({
        type: AUTH.USER_SIGN_IN_FAILED,
        payload: {
          message: "Auth Error"
        }
      });
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: AUTH.USER_SIGN_OUT,
        payload: null
      });
    })
    .catch(error => {
      //console.log(error);
    });
};

export const clearLoginError = () => dispatch => {
  dispatch({
    type: AUTH.CLEAR_LOGIN_ERROR,
    payload: null
  });
};


export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH.FETCH_USER:
      return {
        ...state
      };
    case AUTH.FETCH_USER_SUCCESS:
      return {
        ...state,
        info: action.payload,
      };
    case AUTH.FETCH_USER_FAILED:
      return {
        ...state,
        info: null
      };
    case AUTH.USER_SIGN_IN:
      return {
        ...state,
        error: {
          flag: false,
          msg: ""
        },
        loggedIn: true,
        info: action.payload
      };
    case AUTH.USER_SIGN_IN_FAILED:
      return {
        ...state,
        info: null,
        loggedIn: false,
        error: {
          flag: true,
          msg: action.payload
        }
      };
    case AUTH.USER_SIGN_OUT:
      return INITIAL_STATE;
    case AUTH.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: {
          flag: false,
          msg: null
        }
      };
    default:
      return state;
  }
};