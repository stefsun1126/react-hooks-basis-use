import { combineReducers } from 'redux';
import { ADD_COUNT, SUBTRACTION_COUNT } from './action-type';

const count = (state = 0, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return state + action.data;
    case SUBTRACTION_COUNT:
      return state - action.data;
    default:
      return state;
  }
};

export default combineReducers({
  count,
});
