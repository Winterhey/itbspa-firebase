import axiosIns from 'axios';

const axios = axiosIns.create({
  baseURL: (process.env.NEXT_PUBLIC_VERCEL_URL || '') + `/api/`,
});

export default axios;
