import { MenuOptions } from '@/constant/StoreOption';
import { getMenu } from '@/api/sys';
interface PermissionState {
  permission_menu: Array<MenuOptions>;
}
const state: PermissionState = {
  permission_menu: [] as Array<MenuOptions>,
};

const actions = {
  fetchMenu({ getters, commit }: any, params: any) {
    return new Promise((resolve) => {
      const menu = getters.getPermissionMenu;
      if (getters.getPermissionMenu.length){
        resolve(menu);
      } else {
        getMenu().then((res) => {
          commit('setPermissionMenu', res);
          resolve(res);
        });
      }
    });
  }
};
const mutations = {
  setPermissionMenu(state: PermissionState, menu: Array<MenuOptions>) {
    state.permission_menu = menu;
    // sessionStorage.setItem('menu', JSON.stringify(menu));
  }
};
const getters = {
  getPermissionMenu(state: PermissionState) {
    return state.permission_menu ?? [];
    // : sessionStorage.getItem('menu') === null ? [] : JSON.parse(sessionStorage.getItem('menu'));
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
