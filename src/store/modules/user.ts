import { UserVO } from '@/api/model/custom';
import { ActionTree, GetterTree } from 'vuex';

interface UserState {
  user_id: number;
  username: string;
  user_token: string;
  user_phone: string;
  user_email: string;
  user_sex: number;
  user_introduction: string;
  user_createTime: string;
  user_role: string;
}
const state: UserState = {
  user_id: 0,
  username: '',
  user_token: '',
  user_phone: '',
  user_email: '',
  user_sex: -1,
  user_introduction: '',
  user_createTime: '',
  user_role: '',
};
const mutations = {
  setUserId(state: UserState, id: number) {
    state.user_id = id;
    sessionStorage.setItem('userId', String(id));
  },
  setUsername(state: UserState, username: string) {
    state.username = username;
    sessionStorage.setItem('username', username);
  },
  setUserToken(state: UserState, token: string) {
    state.user_token = token;
    sessionStorage.setItem('token', token);
  },
  setUserPhone(state: UserState, phone: string) {
    state.user_phone = phone;
    sessionStorage.setItem('phone', phone);
  },
  setUserEmail(state: UserState, email: string) {
    state.user_email = email;
    sessionStorage.setItem('email', email);
  },
  setUserSex(state: UserState, sex: number) {
    state.user_sex = sex;
    sessionStorage.setItem('sex', String(sex));
  },
  setUserIntroduction(state: UserState, introduction: string) {
    state.user_introduction = introduction;
    sessionStorage.setItem('introduction', introduction);
  },
  setCreateTime(state: UserState, createTime: string) {
    state.user_createTime = createTime;
    sessionStorage.setItem('createTime', createTime);
  },
  setUserRole(state: UserState, role: string) {
    state.user_role = role;
    sessionStorage.setItem('role', role);
  },
};
const actions: ActionTree<UserState, any> = {
  setUserInfo(context: any, res: UserVO) {
    context.commit('setUserId', res.id);
    context.commit('setUserPhone', res.phone);
    context.commit('setUsername', res.username);
    context.commit('setUserEmail', res.email);
    context.commit('setUserToken', res.token);
    context.commit('setUserSex', res.sex);
    context.commit('setUserIntroduction', res.introduction);
    context.commit('setCreateTime', res.createTime);
  },
  clearUser(context: any,) {
    sessionStorage.clear();
    context.commit('setUserId', 0);
    context.commit('setUserPhone', '');
    context.commit('setUsername', '');
    context.commit('setUserEmail', '');
    context.commit('setUserToken', '');
    context.commit('setUserSex', '');
    context.commit('setUserIntroduction', '');
    context.commit('setPermissionMenu', []);
  },
};
const getters: GetterTree<UserState, any> = {
  getUserId(state: UserState) {
    return state.user_id !== 0 ? state.user_id : sessionStorage.getItem('userId');
  },
  getToken(state: UserState) {
    return state.user_token ? state.user_token : sessionStorage.getItem('token');
  },
  getPhone(state: UserState) {
    return state.user_phone ? state.user_phone : sessionStorage.getItem('phone');
  },
  getEmail(state: UserState) {
    return state.user_email ? state.user_email : sessionStorage.getItem('email');
  },
  getUsername(state: UserState) {
    return state.username ? state.username : sessionStorage.getItem('username');
  },
  getUserSex(state: UserState) {
    return state.user_sex !== -1 ? state.user_sex : sessionStorage.getItem('sex');
  },
  getUserCreateTime(state: UserState) {
    return state.user_createTime ? state.user_createTime : sessionStorage.getItem('createTime');
  },
  getUserIntroduction(state: UserState) {
    return state.user_introduction
      ? state.user_introduction
      : sessionStorage.getItem('introduction');
  },
  getUserRole(state: UserState) {
    return state.user_role ? state.user_role : sessionStorage.getItem('role');
  },
};

export default {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
