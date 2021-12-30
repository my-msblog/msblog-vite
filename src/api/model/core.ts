
export interface BaseDTO{
  page?: number;
  size?: number;
}

export interface PageInfo<T> {
  total: number; //总记录数
  list: Array<T>; //结果集
  pageNum: number; //当前页
  pageSize: number; //每页的数量
  size: number; //当前页的数量
  startRow: number;
  endRow: number;
  pages: number; //总页数
  prePage: number; //前一页
  nextPage: number; //下一页
  isFirstPage: boolean; //是否为第一页
  isLastPage: boolean;
  hasPreviousPage: boolean; //是否有前一页
  hasNextPage: boolean;
  navigatePages: number; //导航页码数
  navigatepageNums: number[]; //所有导航页号
  navigateFirstPage: number; //导航条上的第一页
  navigateLastPage: number; //导航条上的最后一页
}
