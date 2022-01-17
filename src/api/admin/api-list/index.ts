import request from '@/utils/axios/request';
import { RequestItemVO } from '@/api/model/admin/api-list';

enum Api {
    getApi = '/sys/all/interface',
}

export function getAllApi(){
    return request.get<Array<RequestItemVO>>({
        url: Api.getApi,
    });
}