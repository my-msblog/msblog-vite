
export interface IdDTO{
  id?: IdType;
  idList?: Array<IdType>;
}

export interface KeyDTO extends BaseDTO{
  key?: string;
  dateKey?: Date;
  idKey?: IdType;
  arrKey?: Array<any>;
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
