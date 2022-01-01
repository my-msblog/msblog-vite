import {isValidKey} from '@/utils/validate';

export enum Category{
  LifeNotes = 1,
  ExperienceSharing = 2,
  TechnicalSummary = 3,
  Other = 4,
}
enum CategoryState {
  LifeNotes = '生活笔记',
  ExperienceSharing = '经验分享',
  TechnicalSummary = '技术总结',
  Other = '其他',
}

export function getCategory(index: number) {
  let res ;
  const strIndex = Category[index];
  if (isValidKey(strIndex, CategoryState)){
    res = CategoryState[strIndex];
  }
  return res;
}
