export interface CommentItem{
    id: number;
    publishTime: Date;
    children: CommentItem[];
    context: string;
    like: number;
    isLike: boolean;
    publisher: string;
}

export interface CommentSubmitDTO{
    commentId: number;
    context: string;
    replyTime: Date;
}