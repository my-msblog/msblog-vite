import { AxiosRequestConfig } from 'axios';

interface requestOption{
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}
// 泛型接口
export interface Get {
  <T>(option: requestOption): Promise<T>;
}
export interface Post {
  <T>(option: requestOption): Promise<T>;
}
export interface Put {
  <T>(option: requestOption): Promise<T>;
}
export interface Delete {
  <T>(option: requestOption): Promise<T>;
}
