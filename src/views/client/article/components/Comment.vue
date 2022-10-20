<template>
  <div>
    <u-comment
      :config="config"
      @submit="submit"
      @like="like"
      @report="report"
      @reply-more="replyMore"
      @reply-page="replyPage"
    ></u-comment>
    <u-divider />
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, reactive } from 'vue';
import { useStore } from 'vuex';
import { UToast, ConfigApi, CommentApi, UComment } from 'undraw-ui';
import { getCommentList } from '@/api/client/article';
import emoji from './emoji';

const props = defineProps({
  id: {
    type: Number as PropType<number>,
    require: true,
  }
});
const store = useStore();
const config = reactive<ConfigApi>({
  user: {
    id: store.getters.getUserId,
    username: store.getters.getUsername,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    likes: [] as number[],
  },
  emoji,
  comments: []
} as ConfigApi);
const loadComment = () => {
  getCommentList({ id: props.id }).then((res) => {
    console.log(res);
    
  });
};
const submit = (content: string, parentId: number, finish: Fn<CommentApi, void>) => {
    console.log(content);
};

//举报用户
const report = (id: number, finish: () => void) => {
  console.log(id);
};
const like = (id: number, finish: () => void) => {
  console.log(id);
};
//加载更多回复
const replyMore = (parentId: number, closeLoad: Function) => {
  replyPage(parentId, 1, 4);
};

const replyPage = (parentId: number, pageNum: number, pageSize: number) => {
  console.log(parentId);
};
onMounted(() => {
  loadComment();
});
</script>

<style>

</style>
