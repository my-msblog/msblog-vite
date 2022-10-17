export interface ArticleCardVO {
  id: string,
  title: string,
  content: string,
  cover: string,
  typeName: string,
  createTime: string,
  tagVOList: Array<TagVO>,
}

export interface TagVO{
  tagId: number,
  name: string,
  nameZh: string,
}

export interface HomeCardVO {
  article: number,
  category: number,
  tag: number,
  flow: number
}
export interface AnnouncementVO{
  announcement: string,
  user: string,
  time: string,
}
