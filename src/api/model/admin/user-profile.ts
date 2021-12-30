export interface UserProfileVO{
  id: number;
  username: string;
  sex: number;
  email: string;
  phone: string;
  role: string;
  deleted: number;
}
export interface StatusDTO {
  id: number;
  username: string;
  status: number;
}
export class UserProfileVOImpl implements UserProfileVO{
  email: string;
  id: number
  phone: string
  role: string
  sex: number
  username: string;
  deleted: number
  constructor () {
    this.email = '';
    this.id = -1;
    this.phone = '';
    this.role = '';
    this.sex = 0;
    this.username = '';
    this.deleted = 0;
  }

}
