import { TabOption } from '@/constant/StoreOption';
import { GetterTree } from 'vuex';

const state = {
  currentMenu: null,
  tabsList: [
    {
      label: '首页',
      name: 'dashboard',
      path: '/admin',
    },
  ],
};
const mutations = {
  // 选择标签
  selectMenu(state: any, val: TabOption) {
    if (val.name === 'home') {
      state.currentMenu = null;
    } else {
      state.currentMenu = val;
      // 如果等于-1说明tabsList不存在那么插入，否则什么都不做
      const result = state.tabsList.findIndex((item: TabOption) => item.name === val.name);
      if (result === -1) {
        state.tabsList.push(val);
      }
    }
  },
  // 关闭标签
  closeTab(state: any, val: TabOption) {
    const result = state.tabsList.findIndex((item: TabOption) => item.name === val.name);
    state.tabsList.splice(result, 1);
  },
};

const getters: GetterTree<any, any> = {
  getTagList(state) {
    return state.tabsList;
  },
};

const actions = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
