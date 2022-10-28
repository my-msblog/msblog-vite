import { IdDTO } from '@/api/model/custom';
import request from '@/utils/axios/request';
import { AuditCommentVO } from './model';


enum API {
  page = '/context/page/audit/comment',
  remove = '/context/remove/comment',
  audit = '/context/audit/comment', 
}

export function getAuditPage(dto: BaseDTO){
  return request.post<PageInfo<AuditCommentVO>>({
    url: API.page,
    data: dto
  });
}

export function delComment(dto: IdDTO){
  return request.post<string>({
    url: API.remove,
    data: dto
  });
}

export function auditCommemt(dto: IdDTO){
  return request.post<string>({
    url: API.audit,
    data: dto
  });
}

