<template>
  <div v-for="(item, index) in list" :key="index" class="comment-main">
    <el-avatar :size="32" class="comment-avatar" :src="imgSrc"></el-avatar>
    <div class="comment-mate">
      <div class="comment-user">
        <span>name</span>
        <span class="comment-time">time</span>
      </div>
      <p class="comment-text">
        commnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet text
        ccommnet textcommnet textcommnet textcommnet textcommnet t <br>
        commnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet textcommnet text
        ccommnet textcommnet textcommnet textcommnet textcommnet t
      </p>
      <div class="comment-action">
        <span @click="handleLike"><SvgIcon name="love" :color="chooseColor()" size="12" /></span>
        <span>12</span>
        <span>回复</span>
      </div>
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
import { NullFunctionArry } from '@/constant/Type';
interface CommentListProps {
  list?: Array<any>;
}
const props = withDefaults(defineProps<CommentListProps>(), {
  list: NullFunctionArry(),
});
const data = reactive({
    love: false,
});
const imgSrc = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const handleLike = () => {
    data.love = !data.love;
};
const chooseColor = (): string => {
    return data.love ? '#f4364c': '#00000073';
};
</script>

<style lang="scss" scoped>
.comment-main {
  display: flex;
  .comment-avatar {
    min-width: 32px;
  }
  .comment-mate {
    margin-left: 15px;
    text-align: left;
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
      span{
        padding-right: 8px;
        cursor: pointer;
        font-size: 12px;
      }
    }
  }
}
</style>