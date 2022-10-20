<template>
  <div v-for="(item) in list" :key="item.id" class="comment-main">
    <el-avatar :size="32" class="comment-avatar" :src="imgSrc"></el-avatar>
    <div class="comment-mate">
      <div class="comment-user">
        <span>{{ item.publisher }}</span>
        <span class="comment-time">{{ item.publishTime }}</span>
      </div>
      <p class="comment-text">
        {{ item.context }}
      </p>
      <div class="comment-action">
        <span @click="handleLike(item.id, item.commenterId)">
          <SvgIcon name="love" :color="chooseColor(item.id)" size="12" />
        </span>
        <span>{{ item.like }}</span>
        <span class="reply-text" @click="showReply(item.publisher, item.id, item.id)">回复</span>
      </div>
      <el-divider class="divider" />
      <div v-for="(children, i) in item.children" :key="i" class="children-comment">
        <el-avatar :size="32" class="comment-avatar" :src="imgSrc" />
        <div class="children-mate">
          <div class="comment-user">
            <span>
              {{ !strIsEmpty(children.respondent) ? children.publisher + ' 回复 ' + children.respondent : children.publisher }}
            </span>
            <span class="comment-time">{{ children.publishTime }}</span>
          </div>
          <p class="comment-text">
            {{ children.context }}
          </p>
          <div class="comment-action">
            <span @click="handleLike(children.id, children.commenterId)">
              <SvgIcon name="love" :color="chooseColor(children.id)" size="12" />
            </span>
            <span>{{ children.like }}</span>
            <span class="reply-text" @click="showReply(children.publisher, children.id, item.id)">回复</span>
          </div>
        </div>
      </div>
      <CommentInput
        v-if="data.showReply && item.id === data.showIndex"
        :cancel-show="true"
        :text-placeholder="data.placeholder"
        @submit-comment="handleSubmit"
        @cancel="handleReplyCancel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
export default defineComponent({
  name: 'CommentList',
});
</script>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import CommentInput from './CommentInput.vue';
import { NullFunctionArray } from '@/constant/type';
import { CommentItemVO, GiveLikesDTO } from '@/api/model/client/article';
import { strIsEmpty, arryRemove } from '@/utils';
import { commentSubmit, giveLikes, getLikeList } from '@/api/client/article';

interface IProps {
  list?: Array<CommentItemVO>;
}
interface IData{
  love: boolean;
  showReply: boolean;
  showIndex: number;
  placeholder: string;
  currerResponderId: number;
  isLikeList: number[];
}
const { t } = useI18n();

const props = withDefaults(defineProps<IProps>(), {
  list: NullFunctionArray(),
});
const emit = defineEmits<{
  (event: 'reload'): void,
  (event: 'changeLike', id: number, state: number): void,
}>();
const store = useStore();
const data = reactive<IData>({
    love: false,
    showReply: false,
    showIndex: -1,
    placeholder: t('message.reply'),
    currerResponderId: 0,
    isLikeList: [],
});
const imgSrc = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const handleLike = (id: number, uId: number) => {
  if(strIsEmpty(store.getters.getToken)){
    ElMessage.warning({
      message: t('message.must_login'),
    });
    return;
  }
  const params: GiveLikesDTO = {
    userId: uId,
    commentId: id,
    time: new Date,
    is: isInLikeList(id),
  };
  giveLikes(params).then(() => {
    if (params.is){
      arryRemove(data.isLikeList, id);
      emit('changeLike', id, -1);
    } else{
      data.isLikeList.push(id);
      emit('changeLike', id, 1);
    }
  });
};
const isInLikeList = (id: number) => {
  return data.isLikeList.some((item) => {
      if(item === id){
        return true;
      }
    });
};
const chooseColor = (id: number): string => {
    return isInLikeList(id) ? '#f4364c': '#00000073';
};
const showReply = (responder: string, responderId: number, index: number) => {
  data.placeholder =  t('message.reply') + ' @'+ responder;
  data.showIndex = index;
  data.showReply = true;
  data.currerResponderId = responderId;
};
const handleReplyCancel = () => {
  data.showReply = false;
  data.currerResponderId = 0;
  data.showIndex = -1;
};
const handleSubmit = (context: string) => {
  if (data.currerResponderId === 0){
    ElMessage.error({
      message: t('message.reply_error'),
    });
    return;
  }
  const params = {
    commentId: data.currerResponderId,
    context: context,
    replyTime: new Date(),
  };
  commentSubmit(params).then(() => {
    // 重新渲染评论列表
    emit('reload');

  }).catch((error) => {
    console.log(error);

  });
};
onMounted(() => {
  getLikeList({ id: 1 }).then((res) => {
    data.isLikeList = res;
  });
});
</script>

<style lang="scss" scoped>
.comment-main {
  display: flex;
  text-align: left;
  width: 100%;
  .comment-avatar {
    min-width: 32px;
  }
  .comment-mate {
    margin-left: 10px;
    width: 100%;
    .comment-user{
      color: #00000073;
      font-size: 12px;
      span{
        padding-right: 8px;
      }
      .comment-time{
          color: #ccc;
      }
    }
    .comment-text{
        font-size: 14px;
        box-sizing: border-box;
    }
    .comment-action{
      margin-top: 8px;
      color: #00000073;
      span{
        padding-right: 8px;
        cursor: pointer;
        font-size: 12px;
      }
      .reply-text:hover{
        color: #49b1f5;
      }
    }
  }
  .divider{
    margin: 10px 0;
  }
  .children-comment{
    padding: 10px 0;
    display: flex;
    .children-mate{
      margin-left: 10px;
      width: 100%;
    }
  }
}
</style>
