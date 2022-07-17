import axios from 'axios';
import authHeader from '../auth/authHeader';

const categories = ({ currentPage }) => {
  return axios.get(process.env.REACT_APP_API_URL + '/api/categories?page=' + currentPage);
};

const createPost = (payload) => {
  return axios.post(process.env.REACT_APP_API_URL + '/api/posts', payload, {
    headers: authHeader(),
  });
};

const blogService = {
  categories,
  createPost,
};
export default blogService;
