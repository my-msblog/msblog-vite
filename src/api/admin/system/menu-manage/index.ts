import request from '@/utils/axios/request';
import { MenuTreeVO } from '@/api/model/admin/system';

enum Api {
    getMenuTress = '',
}

export function getMenuTrees(){
    return request.get<MenuTreeVO[]>({
        url: Api.getMenuTress,
    });
}