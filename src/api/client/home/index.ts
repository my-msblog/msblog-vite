import { ArticleCardVO, HomeCardVO, AnnouncementVO } from '../../model/client/home';
import { BaseDTO, PageInfo } from '@/api/model/core';
import request from '@/utils/axios/request';

enum Api {
  articlePages = '/client/article/page',
  getMainInfo = '/client/info',
  getAnnouncement = '/client/get/announcement',
}

export function getAnnouncement(){
  return request.get<AnnouncementVO>({
    url: Api.getAnnouncement,
  });
}

export function getArticlePage(dto : BaseDTO){
  return request.post<PageInfo<ArticleCardVO>>({
    url: Api.articlePages,
    data: dto,
  });
}

export function getMainInfo(){
  return request.get<HomeCardVO>({
    url: Api.getMainInfo,
  });
}
