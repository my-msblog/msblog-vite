import { createStore } from 'vuex';
import modules from './modules';
import actions from './actions';
import getters from './getters';
import mutations from '@/store/mutations';

export default createStore({
  state: {
    code_key: '',
    current_path: ''
  },
  mutations,
  actions,
  modules,
  getters,
});

