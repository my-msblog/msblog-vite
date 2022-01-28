export interface CommentItemVO{
    id: number;
    articleId: number;
    parentId: number;
    publishTime: Date;
    children: CommentItemVO[];
    context: string;
    like: number;
    isLike: boolean;
    publisher: string;
    respondent: string;
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