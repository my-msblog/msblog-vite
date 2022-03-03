import { TagVO } from '@/api/model/client/home';

export interface IData{
    commentList: Array<any>;
    article: IArticle;

}
export interface IArticle{
    id: number;
    title: string;
    context: string;
    writer: string;
    contextMd: string;
    likes: number;
    read: number;
    wordCount: number;
    cover: string;
    tags: Array<TagVO>;
    type:  number;
    typeName: string;
    createTime: Date | string;
    updateTime: Date | string;
}