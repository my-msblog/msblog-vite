import request from '@/utils/axios/request';
import { CaptchaVO, LoginDTO } from '@/api/model/client/login-model';
import { UserVO } from '@/api/model/custom';

enum Api {
  login = '/login',
  spec = '/code/captcha/spec',
  arithmetic = '/code/captcha/arithmetic',
}

export function loginByPwd(dto: LoginDTO) {
  return request.post<UserVO>({
    url: Api.login,
    data: dto,
  });
}
export function getSpecCode() {
  return request.get<CaptchaVO>({
    url: Api.spec
  });
}
export function getArithmeticCode() {
  return request.get<CaptchaVO>({
    url: Api.arithmetic
  });
}
