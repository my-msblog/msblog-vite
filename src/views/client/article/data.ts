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
    read: number;
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
    title: '文章标题',
    writer: 'ms',
    typeName: '类别',
    likes: 12,
    read: 200,
    content: '23123123123123123123',
    contentMd: `# hello\n  `+`## t\n`+`### 1t\n`+`# 2t\n`+`# 3t\n`+
        `# 4t\n`+`# 5t\n`+`# 6t\n`+`# 7t\n`+`# 8t\n`+`# 9t\n`+`# 00t\n`+`# 11t\n`+`# 22t\n`,
    tags: [
        {
            name: 'aaa',
            nameZh: 'aaa',
        },
        {
            name: 'aaa',
            nameZh: 'aaa',
        },
    ],
    createTime: new Date().toLocaleDateString(),
    updateTime: new Date().toLocaleDateString(),
} as IArticle;