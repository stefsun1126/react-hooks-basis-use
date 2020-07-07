import { ADD_COUNT, SUBTRACTION_COUNT } from './action-type';

export const addCount = () => ({
  type: ADD_COUNT,
  data: 1,
});

export const subtractionCount = () => ({
  type: SUBTRACTION_COUNT,
  data: 1,
});
