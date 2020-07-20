import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

// actions to get profile, clear, update etc.
const initialState = {
  // profile will make a request and put all the data here
  profile: null,
  // profile listing page
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
