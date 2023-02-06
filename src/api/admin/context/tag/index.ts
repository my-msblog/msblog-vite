import { TagVO } from '@/api/model/client/home';
import { IdDTO, KeyDTO } from '@/api/model/custom';
import request from '@/utils/axios/request';


enum Api {
  page = '/context/page/tag',
  remove = '/context/remove/tag',
  save = '/context/save/tag',
}

export function getTagPage(data: KeyDTO){
  return request.post<PageInfo<TagVO>>({
    url: Api.page,
    data
  });
}

export function removeTag(data: IdDTO){
  return request.post<string>({
    url: Api.remove,
    data
  });
}

export function saveTag(data: { id: IdType, name: string, nameZh: string}){
  return request.post<string>({
    url: Api.save,
    data
  });
}

