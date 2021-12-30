export enum Categroy{
  '生活笔记' = 1,
  '经验分享' = 2,
  '技术总结' = 3,
  '其他' = 4,
}

export function getCategory(index: number) {
  return Categroy[index];
}