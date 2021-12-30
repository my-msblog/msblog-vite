export interface StatisticsVO {
  value: CardValueVO,
  total: CardValueVO,
}
export interface CardValueVO {
  visit: number;
  user: number;
  articles: number;
  comments: number;
}
