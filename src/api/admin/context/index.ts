import request from '@/utils/axios/request';
import { AuditCommentVO } from './model';


enum API {
  page = '/context/page/audit/comment',
}

export function getAuditPage(dto: BaseDTO){
  return request.post<PageInfo<AuditCommentVO>>({
    url: API.page,
    data: dto
  });
}