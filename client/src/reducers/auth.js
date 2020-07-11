import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

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

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        // payload is name, user, avatar etc minus password
        user: payload,
      };
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
    case AUTH_ERROR:
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
