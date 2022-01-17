<template>
  <el-container>
    <el-header class="ly_top">
      <AdminHeader class="admin_header" />
    </el-header>
    <el-container :class="{'folded':data.folded}">
      <el-aside class="ly_left">
        <el-scrollbar>
          <PermissionMenu class="ly_menu" :menu="data.menu" :is-collapse="data.folded" />
        </el-scrollbar>
        <span class="btn_folded" @click="data.folded = !data.folded">
          <i :class="data.folded ? 'el-icon-s-fold' : 'el-icon-s-unfold'" style="color: #888" />
        </span>
      </el-aside>
      <el-container class="other_as">
        <el-main class="ly_main">
          <BreadCrumb class="c_crumb" />
          <TagView class="c_tag_view" />
          <el-divider />
          <div style="padding: 10px">
            <router-view v-slot="{ Component }">
              <transition name="el-fade-in" :duration="1500">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
        <el-footer class="ly_footer">
          Copyright@2020-2021 by MS
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TagView from './components/tag-views/index.vue';
import PermissionMenu from './components/PermissionMenu.vue';
import BreadCrumb from './components/BreadCrumb.vue';
import AdminHeader from './components/AdminHeader.vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'AdminLayout',
  components: { TagView, AdminHeader, PermissionMenu, BreadCrumb },
  setup() {
    const store = useStore();
    const data = reactive({
      folded: false,
      menu: [],
    });
    data.menu = store.getters.getPermissionMenu;
    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.ly_top{
  background-color: #e4e7ed;
  margin: 0;
  padding: 0;
  height: #{$admin_header_height};
  z-index: 999;
  position: fixed;
  box-shadow: 0 0.5px 2px rgba(12, 12, 12, 0.51);
  width: 100%;
  .admin_header{
  }
}
.ly_main{
  padding: 0;
  min-height: calc(100vh - #{$admin_header_height});
  margin-left: #{$admin_aside_width};
  background-color: rgb(247, 249, 251);
  margin-top: #{$admin_header_height};
  transition: margin-left 0.4s;
  -webkit-transition: margin-left 0.4s;
  .c_crumb{
    margin: 10px;
  }
  .c_tag_view{
    margin-left: 10px;
  }
  .el-divider{
    margin: 2px 0;
  }
  .el-fade-in-leave-to{
    display: none;
  }
}
.other_as{
  background-color:rgb(247, 249, 251); //#f0f2f5
}
.ly_left{
  position: fixed;
  padding: 0;
  box-shadow: 0 0 25px 0 rgb(24 24 25 / 15%);
  width: #{$admin_aside_width} !important;
  top: #{$admin_header_height};
  height: calc(100vh - #{$admin_header_height});
  background-color: #fff;
  transition: width 0.4s;
  -webkit-transition: width 0.4s;
  .ly_menu{
    padding-bottom: 40px;
  }
}
.ly_footer{
  padding: 0;
  margin-left: #{$admin_aside_width};
  transition: margin-left 0.4s;
  background-color: rgb(247, 249, 251);
  -webkit-transition: margin-left 0.4s;
}
.btn_folded{
  position: fixed;
  display: block;
  width: #{$admin_aside_width};
  height: 40px;
  bottom: 0;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  background-color: #e4e7ed;
  cursor: pointer;
  transition: width 0.4s;
  -webkit-transition: width 0.4s;
}
.folded .ly_main{
  margin-left: 64px;
}
.folded .btn_folded{
  width: 64px !important;
}
.folded .ly_left{
  width: 64px !important;
}
.folded .ly_footer{
  margin-left: 64px;
}
</style>
