import { TagVO } from './home';
export interface CategoryVO{
  categoryId: number;
  category: string;
  count: number
}

export interface ArticleCategoryVO{
  id: number;
  title: string;
  cover: string;
  typeName: string;
  createTime: Date;
  tagVOList: Array<TagVO>;
}