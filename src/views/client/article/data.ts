import { CommentItemVO, RecommendVO } from '@/api/model/client/article';
import { TagVO } from '@/api/model/client/home';
import { CommentApi, ReplyApi } from 'undraw-ui';

export interface IData{
    commentList: Array<any>;
    article: IArticle;
    nouns: Array<TitleElement>;
    like: number;
    recommendList: Array<RecommendVO>;
}
export interface TitleElement{
    title: any,
    lineIndex: any,
    indent: number,
}
export interface IArticle{
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

export function toCommentTree(list: CommentItemVO[]): CommentApi[]{
    const rootList = list.filter(i => i.parentId === null);
    const root: CommentApi[] = rootList.map(i => ({
        ...i,
        createTime: i.createTime.toString(),
        reply: {
            total: 0,
            list: []
        },
    }));
    root.forEach(i=> {
        let total = 0;
        list.forEach(item => {
            if (item.parentId === i.id){
                total++;
                i.reply?.list.push(item as CommentApi);
            }
        });
        i.reply!.total = total;
    });
    
    return root;
}