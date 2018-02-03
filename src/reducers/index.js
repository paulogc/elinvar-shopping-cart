import {
  combineReducers,
} from 'redux';

// import products from '../containers/ProductPage/reducer';
// import cart from '../containers/YourCartPage/reducer';
// import appStatus from './appStatus';

import { entities, communication } from 'redux-shelf';

const reducers = combineReducers({
  communication,
  entities,
});

export default reducers;
