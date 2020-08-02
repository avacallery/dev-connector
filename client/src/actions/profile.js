import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  // this will be hitting the get request in the profile component
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    });
  }
};

// Create or update profile
// redirect after form sent using history -> push
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // make POST request to send formData to api/profile
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    // set alert 'updated' or 'created'
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
    console.log('Success');

    // history will redirect to dashboard
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    // // errors will display if fields are left empty
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    });
  }
};

// Add Experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      // send profile as payload
      payload: res.data,
    });

    dispatch(setAlert('Expierience Added'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusTest, status: err.response.status },
    });
  }
};
