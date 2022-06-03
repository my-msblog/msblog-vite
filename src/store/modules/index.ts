import { ModuleTree } from 'vuex';
import tagView from './members/tag-views';
import user from '@/store/modules/members/user';
import permission from '@/store/modules/members/permission';
import list from './members/list';
export const modules: ModuleTree<any> = {
  tagView,
  user,
  permission,
  list,
};
