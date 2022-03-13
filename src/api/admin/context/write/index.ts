import { BaseOptions } from '@/constant/Type';
import request from '@/utils/axios/request';

enum API {
    categoryList = '',
    tags = '', 
}

export function categoryList(){
    return request.get<Array<BaseOptions<number, string>>>({
        url: API.categoryList
    });
}

export function tagsList(){
    return request.get<Array<BaseOptions<number, string>>>({
        url: API.tags
    });
}