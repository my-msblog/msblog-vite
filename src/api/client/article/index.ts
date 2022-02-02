import request from '@/utils/axios/request';
import { CommentItemVO, CommentSubmitDTO, GiveLikesDTO }  from '@/api/model/client/article';
import { IdDTO } from '@/api/model/custom';
import { PageInfo } from '@/api/model/core';

enum API {
    commentSubmit = '',
    getCommentList = '/article/comment',
    like = '/article/comment/like',
}

export function commentSubmit(dto: CommentSubmitDTO){
    return request.post<string>({
        url: API.commentSubmit,
        data: dto,
    });
}
export function getCommentList(dto: IdDTO){
    return request.post<PageInfo<CommentItemVO>>({
        url: API.getCommentList,
        data: dto,
    });
}
export function giveLikes(dto: GiveLikesDTO){
    return request.post<string>({
        url: API.like,
        data: dto,
    });
}