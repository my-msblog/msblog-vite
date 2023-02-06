<template>
  <div>
    <el-menu
      router
      default-active="/admin"
      mode="vertical"
      :collapse="isCollapse"
    >
      <div v-for="(item,i) in menu" :key="i">
        <el-sub-menu v-if="item.children.length !== 0" :index="(i).toString()" style="text-align: left;">
          <template #title>
            <ElIcons v-if="!(item.meta as any).icon.includes('svg')" :name="(item.meta as any).icon" />
            <el-icon v-else><SvgIcon :size="18" :name="(item.meta as any).icon.replace('svg-', '')" /></el-icon>
            <span>
              {{ $t('router.'+(item.meta as any).nameZh) }}
            </span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
            @click="handleClick(child)"
          >
            <ElIcons v-if="!(child.meta as any).icon.includes('svg')" :name="(child.meta as any).icon" />
            <el-icon v-else><SvgIcon :size="18" :name="(child.meta as any).icon.replace('svg-', '')" /></el-icon>
            {{ $t('router.'+(child.meta as any).nameZh) }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :key="item.path"
          :index="(i).toString()"
          style="text-align: left"
          :route="item.path"
          @click="handleClick(item)"
        >
          <ElIcons v-if="!(item.meta as any).icon.includes('svg')" :name="(item.meta as any).icon" />
          <el-icon v-else><SvgIcon :size="18" :name="(item.meta as any).icon.replace('svg-', '')" /></el-icon>
          <template #title> {{ $t('router.'+(item.meta as any).nameZh) }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu',

});
</script>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { TabOption, MenuOptions } from '@/constant/StoreOption';

const props = withDefaults(defineProps<{
  isCollapse: boolean,
  menu: Array<MenuOptions>,
}>(),{
  isCollapse: false,
  menu: () => [] as Array<MenuOptions>,
});
const { t } = useI18n();
const router = useRouter();
const store = useStore();
const currentPath = function () {
  return router.currentRoute;
};
function handleClick(item: MenuOptions) {
  const tabs: TabOption = {
    path: item.path,
    name: (item.meta as any).nameZh,
    label: t('router.' + (item.meta as any).nameZh),
  };
  store.commit('selectMenu', tabs);
}
</script>

<style lang="scss" >
.el-menu{
  border-right: 0;
}
.data.collapse .el-menu span {
  display: none;
}
/* 解决el-submenu外层嵌套div导致无法正常折叠菜单，并且<style>中不能加 scoped，否则还会显示 >*/
/*隐藏文字*/
.el-menu--collapse  .el-sub-menu__title span{
  display: none;
}
/*隐藏 > */
.el-menu--collapse  .el-sub-menu__title .el-sub-menu__icon-arrow{
  display: none;
}
</style>
