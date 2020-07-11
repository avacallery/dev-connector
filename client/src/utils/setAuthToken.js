import axios from 'axios';
//adding global header so we need axios

const setAuthToken = (token) => {
  // check token in local storage
  // if there is, we set the global header using axios
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
