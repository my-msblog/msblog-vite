import request from '@/utils/axios/request';
import { KeyDTO } from '@/api/model/custom';

enum API {
  list = '',
}

export function getList(data: KeyDTO) {
  return request.post<string>({
    url: API.list,
    data,
  });
}
