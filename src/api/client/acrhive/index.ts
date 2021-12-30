import requset from '@/utils/axios/request';
import { BaseDTO, PageInfo } from '@/api/model/core';
import { AcrhiveVO } from'@/api/model/client/acrhive';
enum Api {
  page = '/article/date/page',
}

export function getArchivePage(dto: BaseDTO){
  return requset.post<PageInfo<AcrhiveVO>>({
    url: Api.page,
    data: dto,
  });
}