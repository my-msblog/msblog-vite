import { SelectOptions, CustomOptions } from '@/constant/Type';
import request from '@/utils/axios/request';
import { ArticleCommitDTO } from './model';

enum API {
    categoryList = '/context/category/list',
    tags = '/context/tag/list', 
    commit = '/context/article/commit',
}

export function categoryList(){
    return request.get<Array<SelectOptions>>({
        url: API.categoryList,
    });
}

export function tagsList(){
    return request.get<Array<SelectOptions>>({
        url: API.tags,
    });
}

export function commit(data: ArticleCommitDTO){
    return request.post({
        url: API.commit,
        data
    });
}