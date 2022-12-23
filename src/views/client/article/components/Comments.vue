<template>
  <div class="comment-wrapper">
    <Comment :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Comment from './Comment.vue';


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
