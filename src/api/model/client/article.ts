import { TagVO } from './home';

export interface CommentItemVO{
    id: number;
    parentId: number;
    uid: number;
    username: string;
    avatar: string;
    level: number;
    link: string;
    address: string;
    createTime: Date | string;
    content: string;
    like: number;
}

export interface ArticleVO{
    id: bigint;
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

export interface CommentSubmitDTO{
    parentId: number;
    context: string;
    articleId: number;
}

export interface GiveLikesDTO{
    userId: number;
    commentId: number;
    is: boolean;
    time: Date;
}

export interface RecommendVO{
    id: number;
    title: string;
    cover: string;
    createTime: string;
}
