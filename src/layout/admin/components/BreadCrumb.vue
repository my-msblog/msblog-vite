<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in data.breadList" :key="index">
      <span v-if="index !== data.breadList.length-1" class="no-redirect">
        <router-link to="/admin/dashboard">
          {{ $t('router.' + item.meta.tag) }}
        </router-link>
      </span>
      <a v-else>{{ $t('router.' + item.meta.tag) }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch
} from 'vue';
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'BreadCrumb',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      breadList: [] as Array<RouteLocationMatched>,
      getBreadcrumb() {
        data.breadList = route.matched;
        // if (data.breadList[0].path === '/admin') {
        //   data.breadList.pop();
        // }
      }
    });
    // function handleLink(item) {
    //   const { redirect, path } = item;
    //   if (redirect) {
    //     router.push(redirect);
    //     return;
    //   }
    //   console.log(path);
    // }
    onMounted(() => {
      data.getBreadcrumb();
    });
    watch(
      () => route.matched,
      (newVal, oldVal) => {
        data.getBreadcrumb();
      }
    );
    return {
      data,
      // handleLink,
      ...toRefs(data),
    };
  }
});
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
