import axios from 'axios';
import authHeader from '../auth/authHeader';
import { store } from '../../store';

const categories = ({ currentPage }) => {
  return axios.get(process.env.REACT_APP_API_URL + '/api/categories?page=' + currentPage);
};

const createPost = (payload) => {
  const state = store.getState();
  return axios.post(process.env.REACT_APP_API_URL + '/api/posts', payload, {
    headers: authHeader(state.auth.accessToken),
  });
};

const getPostBySlug = (payload) => {
  const state = store.getState();
  return axios.post(process.env.REACT_APP_API_URL + '/api/postbyslug', payload, {
    headers: authHeader(state.auth.accessToken),
  });
};

const blogService = {
  categories,
  createPost,
  getPostBySlug,
};
export default blogService;
