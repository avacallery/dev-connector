//register a user

import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  //access token from local storage
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  //when we make a req to register or login, we set isAuthenticated to true
  loading: true,
  //make sure loading is done when we load a user
  user: null,
  //user state will update if loading successful
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  //test REGISTER_SUCCESS
  switch (type) {
    case REGISTER_SUCCESS:
      //set the token
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
