import { MenuOptions } from '@/constant/StoreOption';
interface PermissionState {
  permission_menu: Array<MenuOptions>;
}
const state: PermissionState = {
  permission_menu: [] as Array<MenuOptions>
};

const actions = {

};
const mutations = {
  setPermissionMenu(state: PermissionState, menu: Array<MenuOptions>) {
    state.permission_menu = menu;
    // sessionStorage.setItem('menu', JSON.stringify(menu));
  }
};
const getters = {
  getPermissionMenu(state: PermissionState) {
    return state.permission_menu.length !== 0 ? state.permission_menu : [];
    // : sessionStorage.getItem('menu') === null ? [] : JSON.parse(sessionStorage.getItem('menu'));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
