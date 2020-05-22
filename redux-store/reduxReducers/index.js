/* @flow */

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { passwordReducer } from './passwordReducer';

const reducers = combineReducers({
  Auth: authReducer,
  Password: passwordReducer
});

export default reducers;
