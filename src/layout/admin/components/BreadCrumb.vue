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
import { RouteLocationMatched, useRoute } from 'vue-router';

export default defineComponent({
  name: 'BreadCrumb',
  setup() {
    const route = useRoute();
    const data = reactive({
      breadList: [] as Array<RouteLocationMatched>,
      getBreadcrumb() {
        data.breadList = route.matched;
      }
    });
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

.el-breadcrumb {
  font-size: 13px;
  line-height: 40px;
  .no-redirect {
    color: #97a8be !important;
    cursor: text;
  }
}
</style>
