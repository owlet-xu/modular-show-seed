import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import StandardError from 'standard-error';
// import { Message as ElMessage } from 'element-ui';
import i18n from '@/lang';
import { ErrorShow } from './http-error';

const getPromise = (url: string, header?: AxiosRequestConfig): Promise<any> => {
  return axios
    .get(url, header)
    .then((response: any) => {
      return Promise.resolve(response.data);
    })
    .catch((error: any) => {
      if (error && error.response && error.response.data) {
        const errorCode = error.response.data.errorCode;
        const message = error.response.data.message;
        ErrorShow(errorCode, message);
        return Promise.reject(new StandardError(message, error.response.data));
      } else {
        // ElMessage.error(i18n.t('Error.Net').toString());
        return Promise.reject(new StandardError('SystemError', error));
      }
    });
};
const putPromise = (url: string, data?: any): Promise<any> => {
  return axios
    .put(url, data)
    .then((response: any) => {
      return Promise.resolve(response.data);
    })
    .catch((error: any) => {
      if (error && error.response && error.response.data) {
        const errorCode = error.response.data.errorCode;
        const message = error.response.data.message;
        ErrorShow(errorCode, message);
        return Promise.reject(new StandardError(message, error.response.data));
      } else {
        // ElMessage.error(i18n.t('Error.Net').toString());
        return Promise.reject(new StandardError('SystemError', error));
      }
    });
};
const postPromise = (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
  return axios
    .post(url, data, config)
    .then((response: any) => {
      return Promise.resolve(response.data);
    })
    .catch((error: any) => {
      if (error && error.response && error.response.data) {
        const errorCode = error.response.data.errorCode;
        const message = error.response.data.message;
        ErrorShow(errorCode, message);
        return Promise.reject(new StandardError(message, error.response.data));
      } else {
        // ElMessage.error(i18n.t('Error.Net').toString());
        return Promise.reject(new StandardError('SystemError', error));
      }
    });
};
const deletePromise = (url: string, config?: AxiosRequestConfig): Promise<any> => {
  return axios
    .delete(url, config)
    .then((response: any) => {
      return Promise.resolve(response.data);
    })
    .catch((error: any) => {
      if (error && error.response && error.response.data) {
        const errorCode = error.response.data.errorCode;
        const message = error.response.data.message;
        ErrorShow(errorCode, message);
        return Promise.reject(new StandardError(message, error.response.data));
      } else {
        // ElMessage.error(i18n.t('Error.Net').toString());
        return Promise.reject(new StandardError('SystemError', error));
      }
    });
};

// 请求拦截
const useRequestInterceptor = (requestInterceptor: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>) => {
  axios.interceptors.request.use(requestInterceptor);
};

export { getPromise, postPromise, putPromise, deletePromise, useRequestInterceptor, AxiosRequestConfig };
