import axiosIns from 'axios';

const axios = axiosIns.create({
  baseURL: `https://itbspa-firebase.vercel.app/api/`,
});

export default axios;
