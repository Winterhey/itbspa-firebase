import axiosIns from 'axios';

const axios = axiosIns.create({
  baseURL: (process.env.VERCEL_URL || '') + `/api/`,
});

export default axios;
