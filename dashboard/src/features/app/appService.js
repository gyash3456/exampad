import axios from 'axios';
import authHeader from '../auth/authHeader';
import { store } from '../../store';

const getLoggedInUser = () => {
  const state = store.getState();

  return axios.post(
    process.env.REACT_APP_API_URL + '/api/loggedinuser',
    {},
    {
      headers: authHeader(state.auth.accessToken),
    }
  );
};

const appService = {
  getLoggedInUser,
};
export default appService;
