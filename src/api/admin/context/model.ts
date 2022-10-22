import { TagVO } from '@/api/model/client/home';

export interface ArticleEditVO{
    cover: string;
    title: string;
    content: string;
    contentMd: string;
    type: number;
    tags: Array<TagVO>;
}

export interface ManageArticleVO {
    id: IdType;
    title: string;
    writer: string;
    description: string;
    category: string;
    createTime: Date;
}

export interface AuditCommentVO{
    id: IdType;
    status: number;
    content: string;
    articleId: IdType;
    articleTitle: string;
    uid: IdType;
    username: string;
    link: string;
    createTime: Date | string;
}