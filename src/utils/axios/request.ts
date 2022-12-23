import axios from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';
import { useI18n } from '@/hooks/useI18n';
import { Delete, Get, Post, Put } from './type';
const service = axios.create({
  baseURL: '/api',
  timeout: 60 * 1000,
});
const { t } = useI18n();
service.interceptors.request.use(
  config => {
    // 获取后端传来的token
    const token = store.getters.getToken;
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.data = JSON.stringify(config.data);
    config.headers['token'] = token;
    return config;
  },
  error => {
    console.error('request error:', error);
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      const data = response.data;
      if (data.code !== 200) {
        ElMessage({
          message: data.msg || 'error',
          type: 'error',
          duration: 2 * 1000,
        });
        if (data.code === 401) {          
          store.dispatch('clearUser');
          router.replace('/login');
        }
        return reject(data.msg || 'error');
      } else {
        return resolve(data);
      }
    });
  }, error => {
    const response = error.response;
    let info = response ? response.data : 'error';
    
    if (!response){
      info = t('message.server_error');
    }else {
      info = response.data.msg ? response.data.msg :t('message.server_error');
    }
    ElMessage({
      message: info,
      type: 'error',
      duration: 2 * 1000,
    });
    console.error(info);
  }
);

const get: Get = async (opt ) => {
  const data = opt.data;
  const response = await service.get(opt.url, { data, ...opt.config });
  try {
  return response.data;
  } catch {
    throw new Error('Server error');
  }
};
const post: Post = async (option ) => {
  const data = option.data;
  const res = await service.post(option.url, data, { ...option.config });
  try {
  return res.data;
  } catch {
    throw new Error('Server error');
  }
};
const put: Put = async (option ) => {
  const data = option.data;
  const res = await service.post(option.url, data, { ...option.config });
  try {
  return res.data;
  } catch {
    throw new Error('Server error');
  }
};
const deleteRequest: Delete = async (option ) => {
  const data = option.data;
  const res = await service.post(option.url, data, { ...option.config });
  try {
  return res.data;
  } catch {
    throw new Error('Server error');
  }
};

const request = { get, post, put, deleteRequest };

export default request;
