/*  @flow */

import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { routerReducer, createRouterMiddleware, initialRouterState } from 'connected-next-router';
import { loadState, saveState } from './StateLoader';
import loggerMiddleware from './logger';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import reducers from './reduxReducers';
import { composeWithDevTools } from 'redux-devtools-extension';


// State saved in local storage
const persistedState = loadState();

// middlewares - (don't remove thunk)
const middleware = [
  loggerMiddleware,
  thunk
];

// enhancers
const enhancers = [];

// composeWithDevtools - for Redux State Debugging in browser ( Don't Change It)
// for Dev on
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers,
);

const rootReducer = combineReducers({
  ...reducers,
});


// export default function initializeStore(initialState = {}) {
//   const store =  createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunk))
//   );

//   store.subscribe(throttle(() => {
//     console.log("STATE_LENGTH", store.getState());
//     // save state in local storage
//     saveState({
//      Session: store.getState().Session
//     });
//   }, 1000));

//   return store;
// }

const store = createStore(
  reducers,
  persistedState,
  composedEnhancers,
);

store.subscribe(throttle(() => {
  console.log("STATE_LENGTH", store.getState());
  // save state in local storage
  saveState({
    Auth: store.getState().Auth
  });
}, 1000));

export default store;
