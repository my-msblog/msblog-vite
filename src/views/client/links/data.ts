export interface ILink{
  url?: string;
  name: string;
  desc: string;
  header: string;
}

export const mock: ILink[] = [
  {
    url: 'https://www.ms-blog.cn',
    name: 'ms',
    desc: 'ms 的个人博客',
    header: 'https://www.ms-blog.cn/static/png/icon2-684d3252.png'
  },

];