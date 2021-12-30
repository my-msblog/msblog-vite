import request from '@/utils/axios/request';
import { UserVO } from '@/api/model/custom';
import { UserTableChangeDTO } from '@/api/model/user-info-model';
enum Api {
  role = '/info/role',
  userUpdate = '/user/update',
}
export function getRole(){
  return request.get<string>({
    url: Api.role,
  });
}
export function userUpdate(params: UserTableChangeDTO) {
  return request.post<UserVO>({
    url: Api.userUpdate,
    data: params,
  });
}
