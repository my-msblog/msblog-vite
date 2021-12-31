import { UserTableChangeDTO } from '@/api/model/user-info-model';

export interface FormData extends UserTableChangeDTO{
  id?: number,
  username: string,
  sex: number,
  email: string,
  phone: string,
  code: string,
  introduction: string,
}
export const defaultProp = () => {
  return {
    id: 0,
    username: '',
    sex: 0,
    email: '',
    phone: '',
    code: '',
    introduction: '',
  };
};
export const rules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  sex: [{
    required: true,
    message: '性别不能为空',
    trigger: 'change'
  }],
  email: [{
    required: false,
    message: '请输入邮箱',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  }],
  code: [{
    required: true,
    message: '请输入验证码',
    trigger: 'blur'
  }],
  introduction: [{
    required: false,
    message: '简单的介绍下自己吧',
    trigger: 'blur'
  }],
};
