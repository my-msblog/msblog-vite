<template>
  <div>
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <el-tag
        v-for="(tag, index) in tags"
        :key="tag.name"
        size="small"
        type="light"
        :closable="tag.name !== 'dashboard'"
        :disable-transitions="true"
        :hit="true"
        :effect="handleEffect(tag)"
        @close="handleClose(tag, index)"
        @click="changeMenu(tag)"
      >
        {{ $t('router.'+ tag.name) }}
      </el-tag>
    </ScrollPane>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { TabOption } from '@/constant/StoreOption';
import ScrollPane from './ScrollPane.vue';
export default defineComponent({
  name: 'TagView',
  components: { ScrollPane },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route =useRoute();
    const scrollPaneRef = ref(null);
    const state = reactive({
      handleScroll() {},
      handleClose(tag: TabOption, index: number) {
        const length = tags.length - 1;
        store.commit('closeTab', tag);
        if (tag.name !== router.currentRoute.value.meta.title) {
          return;
        }
        if (index === length) {
          router.push(tags[index - 1].path);
        } else {
          // 否则往右边跳转
          router.push(tags[index].path);
        }
      },
      changeMenu(item: TabOption) {
        router.push(item.path);
        store.commit('selectMenu', item);
      },
      handleEffect(tag: TabOption) {
        let path = route.path;
        if (path === '/admin/dashboard') {
          path = '/admin';
        }
        return path === tag.path ? 'dark' : 'plain';
      }
    });
    const tags = store.state.tagView.tabsList;
    return {
      tags,
      scrollPaneRef,
      ...toRefs(state),
    };
  }
});
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-scrollbar__view{
  text-align: left;
}
.tags-view-wrapper {
  text-align: left;
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        //transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
