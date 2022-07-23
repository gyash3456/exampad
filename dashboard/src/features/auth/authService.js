import axios from 'axios';

const register = ({ name, email, password }) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/register', {
    name,
    email,
    password,
  });
};
const login = ({ email, password }) => {
  return axios.post(
    process.env.REACT_APP_API_URL + '/api/login',
    { email, password },
    {
      withCredentials: true,
      credentials: 'include',
    }
  );
};
const logout = () => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/logout', null, {
    withCredentials: true,
    credentials: 'include',
  });
};

const refreshtoken = () => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/refreshtoken', null, {
    withCredentials: true,
    credentials: 'include',
  });
};

const authService = {
  register,
  login,
  logout,
  refreshtoken,
};
export default authService;
