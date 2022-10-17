<template>
  <div>
    <div class="a_banner">
      <p class="a_title">{{ $t('bar.tags') }}</p>
    </div>
    <FlowCard class="tag-flow-card">
      <h1>{{ $t('pages.all_tags') }}</h1>
      <el-link
        v-for="(item, index) in data.tagList"
        :key="index"
        class="tag-item"
        :href="'/tags/' + item.tagId"
        :style="{ fontSize: handleFontSize() + 'px', color: selectColor() }"
        @click="saveTag(item.nameZh)"
      >
        {{ item.nameZh }}
      </el-link>
    </FlowCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { TagVO } from '@/api/model/client/home';
import { getTagList } from '@/api/client/tags';
import { randomNum, strNonEmpty } from '@/utils';
import { colors } from './colors';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Tags',
  setup() {
    const { commit } = useStore();
    const data = reactive({
      tagList: [] as TagVO[],
      currentColor: '',
    });
    const handleTagList = () => {
      getTagList().then((res) => {
        
        
        data.tagList = res;
        console.log(data.tagList);
      });
    };
    const selectColor = (): string => {
      const colorList: string[] = colors;
      let random = Math.floor(Math.random() * (colorList.length - 1));
      return colorList[random];
    };
    const handleFontSize = function () {
      return randomNum(17, 27);
    };
    const saveTag = (tag: string) => {
      commit('setTag', tag);
    };
    onMounted(() => {
      handleTagList();
    });
    return {
      data,
      handleFontSize,
      selectColor,
      saveTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.a_banner {
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background-size: cover !important;
  background: #fff url('../../../assets/background/tags.jpeg') no-repeat center/100%;
  .a_title {
    color: #fff;
    display: block;
    justify-content: center;
    margin-top: 200px;
    font-size: 24px;
    font-weight: bold;
  }
}
.tag-flow-card {
  text-align: center;
  margin: 48px auto 58px;
  padding: 15px 10px 10px !important;
  h1 {
    margin-top: 2px;
  }
  .tag-item {
    padding: 10px;
  }
}
</style>
