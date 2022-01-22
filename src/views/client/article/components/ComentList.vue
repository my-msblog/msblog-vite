<template>
  <div v-for="(item, index) in list" :key="index" class="comment-main">
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
        <span @click="handleLike(item.id)">
          <SvgIcon name="love" :color="chooseColor(item.isLike)" size="12" />
        </span>
        <span>{{ item.like }}</span>
        <span class="reply-text" @click="showReply(item.publisher, item.id)">回复</span>
      </div>
      <el-divider class="divider" />
      <div v-for="(children, i) in item.children" :key="i" class="children-comment">
        <el-avatar :size="32" class="comment-avatar" :src="imgSrc" />
        <div class="children-mate">
          <div class="comment-user">
            <span>{{ children.publisher }}</span>
            <span class="comment-time">{{ children.publishTime }}</span>
          </div>
          <p class="comment-text">
            {{ children.context }}
          </p>
          <div class="comment-action">
            <span @click="handleLike(children.id)"><SvgIcon name="love" :color="chooseColor(children.isLike)" size="12" /></span>
            <span>{{ children.like }}</span>
            <span class="reply-text" @click="showReply(children.publisher, children.id)">回复</span>
          </div>
          <!-- <CommentInput v-if="data.showReply" :cancel-show="true" /> -->
        </div>
      </div>
      <CommentInput
        v-if="data.showReply"
        :cancel-show="true"
        :text-placeholder="data.placeholder"
        @submit-comment="handleSubmit"
        @cancel="handleReplyCancel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'CommentList',
});
</script>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'; 
import { ElMessage } from 'element-plus';
import CommentInput from './CommentInput.vue';
import { NullFunctionArry } from '@/constant/Type';
import { CommentItem } from '@/api/model/client/article';
import { strIsEmpty } from '@/utils';

const { t } = useI18n();
interface CommentListProps {
  list?: Array<CommentItem>;
}

const props = withDefaults(defineProps<CommentListProps>(), {
  list: NullFunctionArry(),
});
const data = reactive({
    love: false,
    showReply: false,
    placeholder: t('message.reply'),
    currerResponderId: 0, 
});
const imgSrc = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const handleLike = (id: number) => {
    data.love = !data.love;
};
const chooseColor = (flag: boolean): string => {
    return flag ? '#f4364c': '#00000073';
};
const showReply = (responder: string, responderId: number) => {
  data.placeholder =  t('message.reply') + ' @'+ responder;
  data.showReply = true;
  data.currerResponderId = 0;
};
const handleReplyCancel = () => {
  data.showReply = false;
};
const handleSubmit = (context: string) => {
  if (data.currerResponderId === 0){
    ElMessage.error({
      message: t('message.reply_error'),
    });
  }
  const params = {
    commentId: data.currerResponderId,
    context: context,
    replyTime: new Date(),

  };
};
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