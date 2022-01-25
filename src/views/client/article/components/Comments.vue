<template>
  <div class="comment-wrapper">
    <ComentList :list="data.asList" />
    <CommentInput />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import CommentInput from './CommentInput.vue';
import ComentList from './ComentList.vue';
import { CommentItemVO } from '@/api/model/client/article';
export default defineComponent({
  name: 'Comments',
  components: { CommentInput, ComentList },
  setup() {
    const data = reactive({
      conmmentList: [],
      asList: [
        {
          id:1,
          publisher: 'tom',
          publishTime: new Date('2021-01-11 12:23'),
          like: 12,
          isLike: true,
          context: 'comment',
          children: [{
            id:3,
            publisher: 'jack',
            publishTime: new Date('2021-02-11 12:23'),
            like: 2,
            isLike: false,
            context: 'children',
            children: [] as CommentItemVO[],
          },
          {
            id:4,
            publisher: 'jac',
            publishTime: new Date('2021-02-11 12:23'),
            like: 2,
            isLike: false,
            context: 'children',
            children: [] as CommentItemVO[],
          }
          ],
        },
        
      ] as CommentItemVO[],
    });
    return {
      data,
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-wrapper{
  flex: auto;
}
</style>
