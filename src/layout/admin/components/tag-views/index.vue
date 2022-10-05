<template>
  <div>
    <ScrollPane
      ref="scrollPaneRef"
      v-auto-animate
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <div ref="viewRef">
        <el-tag
          v-for="(tag, index) in tags"
          :key="tag.name"
          size="large"
          :closable="tag.name !== 'dashboard'"
          :disable-transitions="true"
          :hit="true"
          :effect="handleEffect(tag)"
          class="current"
          @close="handleClose(tag, index)"
          @click="changeMenu(tag)"
        >
          {{ $t('router.'+ tag.name) }}
        </el-tag>
      </div>
    </ScrollPane>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs
} from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import autoAnimate from '@formkit/auto-animate';
import { TabOption } from '@/constant/StoreOption';
import ScrollPane from './ScrollPane.vue';
export default defineComponent({
  name: 'TagView',
  components: { ScrollPane },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const scrollPaneRef = ref();
    const viewRef = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
    const tags = computed(() => store.getters.getTagList);
    const state = reactive({
      handleScroll() {},
      handleClose(tag: TabOption, index: number) {
        const length = tags.value.length - 1;
        store.commit('closeTab', tag);
        if (tag.name !== router.currentRoute.value.meta.title) {
          return;
        }
        if (index === length) {
          router.push(tags.value[index - 1].path);
        } else {
          // 否则往右边跳转
          router.push(tags.value[index].path);
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
    onMounted(() => {
      autoAnimate(viewRef.value);
      if (route.fullPath !== '/admin/dashboard'){
        const currentItem = (): TabOption => {
          const name = route.meta.tag as string;
          return {
            path: route.fullPath,
            name,
            label: t('router.' + name),
          };
        } ;
        const select = currentItem();
        store.commit('selectMenu', select);
      }
    });
    return {
      tags,
      scrollPaneRef,
      viewRef,
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
