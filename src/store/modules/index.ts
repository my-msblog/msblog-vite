import { ModuleTree } from 'vuex';
import tagView from './members/tag-views';
import user from '@/store/modules/members/user';
import permission from '@/store/modules/members/permission';
export const modules: ModuleTree<any> = {
  tagView,
  user,
  permission,
};
