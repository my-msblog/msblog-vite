import request from '@/utils/axios/request';
import { IdDTO, KeyDTO } from '@/api/model/custom';
import { ArticleEditVO, ManageArticleVO } from '@/api/admin/context/model';


enum API {
  list = '',
  get = '/context/get/edit/article'
}

export function getList(data: KeyDTO) {
  return request.post<ManageArticleVO>({
    url: API.list,
    data,
  });
}

export function getEditArticle(data: IdDTO) {
  return request.post<ArticleEditVO>({
    url: API.get,
    data,
  });
}
