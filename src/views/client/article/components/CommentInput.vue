<template>
  <div class="comment-input-wrapper">
    <div style="display: flex">
      <el-avatar
        v-if="headShow"
        class="comment-input-avatar"
        :size="32"
        :src="data.headImg"
      />
      <div class="ml-3">
        <div class="comment-input">
          <textarea
            v-model="data.commentContent"
            class="comment-textarea"
            :placeholder="textPlaceholder"
            auto-grow
            dense
          ></textarea>
        </div>
      </div>
      <div class="emoji-container">
        <SvgIcon name="santa-claus" :size="90"></SvgIcon>
        <div class="btn-submit">
          <el-button size="small" type="primary" @click="handleSubmit">
            {{ $t('button.submit') }}
          </el-button>
          <el-button v-if="cancelShow" size="small" @click="handleCancel">
            {{ $t('button.cancel') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
export default defineComponent({
  name: 'CommentInput',
  props: {
    cancelShow: {
      type: Boolean as PropType<boolean>,
      default: () => {
        return true;
      },
    },
    headShow: {
      type: Boolean as PropType<boolean>,
      default: () => {
        return false;
      },
    },
    textPlaceholder: {
      type: String as PropType<string>,
      default: () => {
        return '留下点什么吧...';
      }
    }
  },
  emits: ['cancel'],
  setup(_, { emit }) {
    const data = reactive({
      headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      commentContent: '',
    });
    const handleSubmit = () => {
      // do
    };
    const handleCancel = () => {
      data.commentContent = '';
      emit('cancel');
    };
    return {
      data,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-input-wrapper {
  max-width: 900px;
  width: 100%;
  background-color: white;
  //border: 1px solid rgba(144, 147, 153, 0.31);
  border-radius: 4px;
  padding: 10px 10px 10px 0;
  margin: auto;
  .comment-input-avatar{
    margin-right: 10px;
    min-width: 32px
  }
  .ml-3 {
    flex: auto;
    .comment-input {
      position: relative;
      flex: auto;
      .comment-textarea {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Lato, Roboto,
          PingFang SC, Microsoft YaHei, sans-serif !important;
        font-size: 0.875rem;
        color: #555 !important;
        outline: none;
        padding: 10px 5px 0 5px;
        min-height: 122px;
        resize: none;
        width: 100%;
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
      display: flex;
      margin-top: 10px;
      justify-content: center;
    }
  }
}
</style>
