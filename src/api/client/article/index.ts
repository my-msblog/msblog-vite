import request from '@/utils/axios/request';
import { 
    CommentItemVO,
    CommentSubmitDTO,
    GiveLikesDTO,
    ArticleVO,
} from '@/api/model/client/article';
import { IdDTO } from '@/api/model/custom';
import { PageInfo } from '@/api/model/core';

enum API {
    getArticle = '/article/get',
    commentSubmit = '',
    getCommentList = '/article/comment',
    like = '/article/comment/like',
    likeList = '/article/comment/like/list',
}

export function getArticle(dto: IdDTO){
    return request.post<ArticleVO>({
        url: API.getArticle,
        data: dto
    });
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
export function getLikeList(data: IdDTO){
    return request.post<Array<number>>({
        url: API.likeList,
        data: data,
    });
}