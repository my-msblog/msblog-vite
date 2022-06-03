<template>
  <div class="comment-wrapper">
    <CommentInput />
    <ComentList :list="data.conmmentList" @change-like="handleChangeLike" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, PropType } from 'vue';
import CommentInput from './CommentInput.vue';
import ComentList from './ComentList.vue';
import { CommentItemVO } from '@/api/model/client/article';
import { getCommentList } from '@/api/client/article';

export default defineComponent({
  name: 'Comments',
  components: { CommentInput, ComentList },
  props: {
    id: {
      type: Number as PropType<number>,
      default: -1,
    },
  },
  setup(props) {
    const data = reactive({
      conmmentList: [] as CommentItemVO[],
    });
    const handleInit = () => {
      getCommentList({id: props.id}).then(res => {
        data.conmmentList = res.list;
      });
    };
    const handleChangeLike = (id: number, state: number) => {
      try{
          data.conmmentList.forEach((item) => {
            if(item.id === id){
              item.like += state;
              throw new Error();
            }
            item.children.forEach((iChilden) => {
              if(iChilden.id === id){
                iChilden.like += state;
                throw new Error();
              }
            });
        });
      }catch(e){//
      }
    };
    onMounted(() => {
      handleInit();
    });
    return {
      data,
      handleChangeLike,
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-wrapper{
  flex: auto;
}
</style>
