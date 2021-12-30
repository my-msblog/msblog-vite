import request from '@/utils/axios/request';
import { CategoryVO, ArticleCategoryVO } from '@/api/model/client/category';
enum Api {
  categroy = '/article/list/category',
  getById = '/article/category/'
}
export function getCategoryList(){
  return request.get<CategoryVO[]>({
    url: Api.categroy,
  });
}
export function getArticleByCategoryId(id: string){
  return request.get<ArticleCategoryVO[]>({
    url: Api.getById + id,
  });
}
