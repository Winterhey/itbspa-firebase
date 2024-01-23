import axiosIns from 'axios';

const axios = axiosIns.create({
  baseURL: `/api/`,
});

export default axios;
