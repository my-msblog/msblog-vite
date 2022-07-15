import { TagVO } from './home';

export interface CommentItemVO{
    id: number;
    articleId: number;
    parentId: number;
    publishTime: Date;
    children: CommentItemVO[];
    context: string;
    like: number;
    commenterId: number;
    isLike: boolean;
    publisher: string;
    respondent: string;
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
    commentId: number;
    context: string;
    replyTime: Date;
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
