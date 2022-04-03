import { TagVO } from '@/api/model/client/home';

export interface IData{
    commentList: Array<any>;
    article: IArticle;
    nouns: Array<TitleElement>;
    like: number;
}
export interface TitleElement{
    title: any,
    lineIndex: any,
    indent: number,
}
export interface IArticle{
    id: number;
    title: string;
    content: string;
    writer: string;
    contentMd: string;
    likes: number;
    reading: number;
    wordCount: number;
    cover: string;
    tags: Array<TagVO>;
    type:  number;
    typeName: string;
    createTime: Date | string;
    updateTime: Date | string;
}
export const data = {
    cover: '../src/assets/background/archive.jpg',
    title: '',
    writer: '',
    typeName: '',
    likes: 0,
    reading: 0,
    content: '',
    contentMd: '',
    tags: [] as TagVO[],
    createTime: new Date().toLocaleDateString(),
    updateTime: new Date().toLocaleDateString(),
} as IArticle;