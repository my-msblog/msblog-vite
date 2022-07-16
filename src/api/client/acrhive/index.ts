import request from '@/utils/axios/request';
import { AcrhiveVO } from'@/api/model/client/acrhive';
enum Api {
  page = '/article/date/page',
}

export function getArchivePage(dto: BaseDTO){
  return request.post<PageInfo<AcrhiveVO>>({
    url: Api.page,
    data: dto,
  });
}
