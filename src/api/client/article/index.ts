import request from '@/utils/axios/request';
import {
    CommentItemVO,
    CommentSubmitDTO,
    GiveLikesDTO,
    ArticleVO,
    RecommendVO,
} from '@/api/model/client/article';
import { IdDTO } from '@/api/model/custom';

enum API {
    getArticle = '/article/get',
    commentSubmit = '/article/comment/submit',
    getCommentList = '/article/comment',
    like = '/article/comment/like',
    likeList = '/article/comment/like/list',
    recommend = '/article/recommend',
    delComment = '/article/comment/remove',
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
export function getRecomend(){
    return request.get<Array<RecommendVO>>({
        url: API.recommend,
    });
}
export function removeComment(id: IdType) {
    return request.post<string>({
        url: API.delComment,
        data: { id },
    });
}