import {dispatch} from '@store';
import axiosInstance, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import BASE_URL from '../helpers/constants';
import {API_CONSTANTS, coreActions} from '../store/loadingReducer';

const axios = axiosInstance.create({
  baseURL: BASE_URL,
});

export type API_KEYS = keyof typeof API_CONSTANTS;

export interface AxiosRequestConfigWithParams extends AxiosRequestConfig {
  API?: API_KEYS;
}

const handleTopLoader = (isLoading: boolean) => {
  dispatch(coreActions.handleIsLoading(isLoading));
};

axios?.interceptors.request.use(
  (config: AxiosRequestConfigWithParams) => {
    handleTopLoader(true);
    return config;
  },
  (error: AxiosError) => {
    handleTopLoader(false);
    return Promise.reject(error);
  }
);

axios?.interceptors.response.use(
  (response: AxiosResponse) => {
    handleTopLoader(false);
    return response;
  },
  (error) => {
    handleTopLoader(false);
    return Promise.reject(error);
  }
);

export default axios;
