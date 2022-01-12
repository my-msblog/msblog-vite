import request from '@/utils/axios/request';
import { TagVO } from '@/api/model/client/home';
enum Api {
  getTagList = '/article/list/tag'
}

export function getTagList(){
    return request.get<Array<TagVO>>({
        url: Api.getTagList,
    });
}