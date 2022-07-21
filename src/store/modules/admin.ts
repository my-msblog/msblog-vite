import { ActionTree, GetterTree, MutationTree } from 'vuex';

interface AdminState{
  articleEditId: IdType,
}
const state: AdminState = {
  articleEditId: '',
};

const getters: GetterTree<AdminState, any> = {
  getArticleEditId: (state) => {
      return state.articleEditId;
  },
};

const mutations: MutationTree<AdminState> = {
  setArticleEditId: (state, value: IdType) => {
      state.articleEditId = value;
  }
};

const actions: ActionTree<AdminState, any> = {};

export default {
    state,
    mutations,
    actions,
    getters,
};
