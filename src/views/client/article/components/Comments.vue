<template>
  <div class="comment-wrapper">
    <Comment :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, PropType } from 'vue';
import CommentInput from './CommentInput.vue';
import ComentList from './ComentList.vue';
import Comment from './Comment.vue';
import { CommentItemVO } from '@/api/model/client/article';
import { getCommentList } from '@/api/client/article';

export default defineComponent({
  name: 'Comments',
  components: { Comment },
  props: {
    id: {
      type: Number as PropType<number>,
      default: -1,
    },
  },
  setup(props) {
  
  
    return {
      
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-wrapper{
  flex: auto;
}
</style>
