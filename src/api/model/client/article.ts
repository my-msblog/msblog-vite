export interface CommentItem{
    id: number;
    publishTime: Date;
    children: CommentItem[];
    context: string;
    like: number;
    parentId: number;
    publisherId: number;
}