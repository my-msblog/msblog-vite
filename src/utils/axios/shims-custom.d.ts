// noinspection ES6UnusedImports
import * as axios from 'axios';

declare module 'axios' {
  // 需要定义返回接口泛型时调用 传入Promise<T>
  export interface CustomSuccessData<T> {
    code: number;
    msg?: string;
    message?: string;
    data?: T;
    [keys: string]: any;
  }
}
