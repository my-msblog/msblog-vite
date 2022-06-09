import request from '@/utils/axios/request';
import { TagVO } from '@/api/model/client/home';
import { ArticleCategoryVO } from '@/api/model/client/category';

enum Api {
  getTagList = '/article/list/tag',
  byId = '/article/tag/'
}

export function getTagList(){
  return request.get<Array<TagVO>>({
      url: Api.getTagList,
  });
}

export function getTagListById(id: string){
  return request.get<Array<ArticleCategoryVO>>({
    url: Api.byId + id,
  });
}