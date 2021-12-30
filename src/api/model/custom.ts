
export interface IdDTO{
  id?: number;
  idList?: Array<number>;
}

export interface UserVO {
  id: number;
  username: string;
  phone: string;
  email: string;
  token: string;
  introduction: string;
  sex: number;
  createTime: string;
}
