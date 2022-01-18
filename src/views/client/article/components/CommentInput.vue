<template>
  <div class="comment-input-wrapper">
    <div style="display: flex">
      <el-avatar :size="32" :src="data.headImg"></el-avatar>
      <div class="ml-3">
        <div class="comment-input">
          <textarea
            v-model="data.commentContent"
            class="comment-textarea"
            placeholder="留下点什么吧..."
            auto-grow
            dense
          />
        </div>
      </div>
      <div class="emoji-container">
        <SvgIcon name="santa-claus" :size="80"></SvgIcon>
        <el-button
          class="btn-submit"
          size="small"
          type="primary"
          @click="handleSubmit"
        >
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'CommentInput',
  setup() {
    const data = reactive({
      headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      commentContent: '',
    });
    const handleSubmit = () => {
      // do 
    };
    return {
      data,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-input-wrapper {
  max-width: 900px;
  width: fit-content;
  background-color: white;
  //border: 1px solid rgba(144, 147, 153, 0.31);
  border-radius: 4px;
  padding: 10px;
  margin: 0 0 10px;
  .ml-3 {
    margin-left: 15px;
    .comment-input {
      position: relative;
      .comment-textarea {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Lato, Roboto,
          PingFang SC, Microsoft YaHei, sans-serif !important;
        font-size: 0.875rem;
        color: #555 !important;
        outline: none;
        padding: 10px 5px 0 5px;
        min-height: 122px;
        resize: none;
        min-width: 700px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
      .comment-textarea:hover {
        border-color: #40a9ff;
        border-right-width: 1px !important;
      }
    }
  }
  .emoji-container {
    margin-left: 20px;
    position: relative;
    .btn-submit {
      bottom: 0;
      position: absolute;
      left: 0;
    }
  }
}
</style>
