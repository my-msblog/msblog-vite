import request from '@/utils/axios/request';
import { CategoryVO, ArticleCategoryVO } from '@/api/model/client/category';
enum Api {
  category = '/article/list/category',
  getById = '/article/category/'
}
export function getCategoryList(){
  return request.get<CategoryVO[]>({
    url: Api.category,
  });
}
export function getArticleByCategoryId(id: string){
  return request.get<ArticleCategoryVO[]>({
    url: Api.getById + id,
  });
}
