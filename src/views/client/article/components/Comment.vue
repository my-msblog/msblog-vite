<template>
  <div>
    <u-comment
      :config="config"
      @submit="submit"
      @like="like"
      @remove="remove"
      @report="report"
      @reply-more="replyMore"
      @reply-page="replyPage"
    ></u-comment>
    <u-divider />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { UToast, ConfigApi, CommentApi, UComment } from 'undraw-ui';
import { 
  getCommentList, 
  getLikeList, 
  commentSubmit,
  giveLikes,
  removeComment,
} from '@/api/client/article';
import { strIsEmpty } from '@/utils';
import { toCommentTree, commentData } from '../data';
import emoji from './emoji';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';

interface IProps {
  id: IdType;
}
const { t } = useI18n();
const props = defineProps<IProps>();
const store = useStore();
const userId = computed<number>(() => store.getters.getUserId);
const username = computed<string>(() => store.getters.getUserName);

const config = reactive<ConfigApi>({
  user: {
    id: userId.value,
    username: username.value,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    likeIds: [] as number[],
  },
  emoji,
  comments: []
});
const loadComment = () => {
  getCommentList({ id: props.id }).then((res) => {
    config.comments = toCommentTree(res.list);
  });
  getLikeList({ id: props.id }).then(res => {
    config.user.likes = res;
  });
};
const submit = (content: string, parentId: IdType, finish: Fn<CommentApi, void>) => {
    commentSubmit({ context: content, articleId: props.id, parentId }).then(() => {
      UToast({ message: '评论提交成功!', duration: 3000 });
      finish(commentData);
      loadComment();
    });
};
const remove = (id: IdType, finish: () => void) => {
  removeComment(id).then(() => {
    finish();
    UToast({ message: '删除成功!' });
  });
};
//举报用户
const report = (uid: number, finish: () => void) => {
  console.log(uid);
  finish();
  UToast({ message: '举报成功!' });
};
const like = (id: number, finish: () => void) => {
  const userToken = store.getters.getToken;
  if (strIsEmpty(userToken)){
    ElMessage({ message: t('message.must_login'), type: 'error' });
  }
  const isExist = config.user.likes.includes(id);
  const userId = store.getters.getUserId;
  giveLikes({
    commentId: id,
    userId: userId,
    is: !isExist,
    time: new Date(),
}).then(() => {
    finish();
  });
};
//加载更多回复
const replyMore = (parentId: number, closeLoad: Function) => {
  closeLoad();
  replyPage(parentId, 1, 4);
};
const page = () => {

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
