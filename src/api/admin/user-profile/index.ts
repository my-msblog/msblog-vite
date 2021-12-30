import request from '@/utils/axios/request';
import { IdDTO } from '@/api/model/custom';
import { BaseDTO, PageInfo } from '@/api/model/core';
import { UserProfileVO, StatusDTO } from '@/api/model/admin/user-profile';
import { UserTableChangeDTO } from '@/api/model/user-info-model';
enum Api {
  page = '/account/user/page',
  delete = '/user/remove',
  deleteList = '/user/remove/list',
  change = '/account/admin/change/user',
  add = '/account/admin/add',
  status_change = '/account/admin/status/change'
}
export function userStatusChange(dto: StatusDTO){
  return request.post<string>({
    url: Api.status_change,
    data: dto
  });
}
export function adminAdd(dto: UserTableChangeDTO){
  return request.post<string>({
    url: Api.add,
    data: dto
  });
}

export function adminChangeUser(dto: UserTableChangeDTO) {
  return request.post<string>({
    url: Api.change,
    data: dto,
  });
}

export function adminUserPage(params: BaseDTO) {
  return request.post<PageInfo<UserProfileVO>>({
    url: Api.page,
    data: params,
  });
}

export function deletedUser(params: IdDTO) {
  return request.post<string>({
    url: Api.delete,
    data: params,
  });
}

export function deleteList(idList: IdDTO) {
  return request.post<string>({
    url: Api.deleteList,
    data: idList,
  });
}
