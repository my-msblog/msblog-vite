import { BaseOptions, CustomOptions } from '@/constant/Type';
import request from '@/utils/axios/request';

enum API {
    categoryList = '',
    tags = '', 
}

export function categoryList(){
    return request.get<Array<CustomOptions>>({
        url: API.categoryList
    });
}

export function tagsList(){
    return request.get<Array<CustomOptions>>({
        url: API.tags
    });
}