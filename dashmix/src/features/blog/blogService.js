import axios from "axios";

const categories = ({ currentPage }) => {
  return axios.get(process.env.REACT_APP_API_URL + "/api/categories?page=" + currentPage);
};

const blogService = {
  categories,
};
export default blogService;
