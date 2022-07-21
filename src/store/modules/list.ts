import { CategoryVO } from '@/api/model/client/category';
import {ActionTree, GetterTree, MutationTree } from 'vuex';
import { arryIsEmpty, strIsEmpty } from '@/utils';
interface ListState{
  categoryList: Array<CategoryVO>;
  category: string;
  tag: string;
}
const state: ListState = {
  categoryList: [],
  category: '',
  tag: '',
};

const getters: GetterTree<ListState, any> = {
  getCategoryList(state: ListState){
    return  arryIsEmpty(state.categoryList)
    ? JSON.parse(sessionStorage.getItem('categoryList') as string)
    : state.categoryList;
  },
  getCategory(state: ListState) {
    return strIsEmpty(state.category) ? sessionStorage.getItem('category') : state.category;
  },
  getTag(state: ListState) {
    return strIsEmpty(state.tag) ? sessionStorage.getItem('tag') : state.tag;
  }
};

const mutations: MutationTree<ListState> = {
  setCategoryList(state: ListState, list: Array<CategoryVO>){
    state.categoryList = list;
    sessionStorage.setItem('categoryList', JSON.stringify(list));
  },
  setCategory(state: ListState, category: string) {
    state.category = category;
    sessionStorage.setItem('category', category);
  },
  setTag(state: ListState, tag: string) {
    state.tag = tag;
    sessionStorage.setItem('tag', tag);
  },
};

const actions: ActionTree<ListState, any> = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
