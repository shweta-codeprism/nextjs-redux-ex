/* @flow */

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { passwordReducer } from './passwordReducer';
import { categoryReducer } from './categoryReducer';
import { subCategoryReducer } from './subCategoryReducer';

const reducers = combineReducers({
  Auth: authReducer,
  Password: passwordReducer,
  Categories: categoryReducer,
  SubCategories: subCategoryReducer
});

export default reducers;
