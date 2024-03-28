import "server-only";

export const AXIOS_CONFIG = {
  baseURL: process.env.NEXT_SERVER_API_BASEURL,
  timeout: 10000,
  withCredentials: true,
};
