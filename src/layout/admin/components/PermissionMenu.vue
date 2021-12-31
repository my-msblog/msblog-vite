<template>
  <div>
    <el-menu router mode="vertical" :collapse="isCollapse">
      <div v-for="(item,i) in menu" :key="i">
        <el-sub-menu v-if="item.children.length !== 0" :index="(i).toString()" style="text-align: left;">
          <template #title>
            <i :class="item.icon" />
            <span>
              {{ $t('router.'+item.nameZh) }}
            </span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
            @click="handleClick(child)">
            <i :class="child.icon" />
            {{ $t('router.'+child.nameZh) }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="(i).toString()"
          style="text-align: left"
          :key="item.path"
          @click="handleClick(item)"
          :route="item.path">
          <i :class="item.icon" />
          <template #title> {{ $t('router.'+item.nameZh) }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { TabOption, MenuOptions } from '@/constant/StoreOption';

export default defineComponent({
  name: 'Menu',
  props: {
    isCollapse: { type: Boolean, default: false },
    menu: [],
  },
  setup(props) {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      adminMenus: [] as Array<MenuOptions>,
      collapse: props.isCollapse,
    });
    const currentPath = function () {
      return router.currentRoute;
    };
    function handleClick(item: MenuOptions) {
      const tabs: TabOption = {
        path: item.path,
        name: item.nameZh,
        label: t('router.' + item.nameZh),
      };
      store.commit('selectMenu', tabs);
    }
    onMounted(() => {
    });
    return {
      data,
      handleClick,
      currentPath,

    };
  }
});
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
