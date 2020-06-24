//alert is just a function that takes in state and an action
//action will get dispatched from another file

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  //evaluate type by case
  switch (type) {
    case SET_ALERT:
      //send state depending on the type in array
      return [...state, payload];
    case REMOVE_ALERT:
      //remove specific alert by id
      return state.filter((alert) => alert.id !== payload);
    default:
      //every reducer will have a default state
      return state;
  }
}
