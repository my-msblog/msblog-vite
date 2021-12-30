import request from '@/utils/axios/request';
import { MenuVO, PhoneDTO } from '@/api/model/sys-model';

enum Api {
  sms = '/code/sms',
  authentication = 'api/authentication',
  menu = '/info/menu',
  logout = '/logout',
}

export function getSMS(dto: PhoneDTO) {
  return request.post<string>({
    url: Api.sms,
    data: dto
  });
}
export function authentication() {
  return request.post<string>({
    url: Api.authentication,
  });
}
export function getMenu() {
  return request.post<Array<MenuVO>>({
    url: Api.menu,
  });
}
export function logout() {
  return request.get<string>({
    url: Api.logout,
  });
}
