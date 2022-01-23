import request from '@/utils/axios/request';
import { CommentSubmitDTO }  from '@/api/model/client/article';

enum API {
    commentSubmit = '',
}

export function commentSubmit(dto: CommentSubmitDTO){
    return request.post<string>({
        url: API.commentSubmit,
        data: dto,
    });
}