<template>
  <div>
    <ComentList :list="data.asList" />
    <CommentInput />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import CommentInput from './CommentInput.vue';
import ComentList from './ComentList.vue';
export default defineComponent({
  name: 'Comments',
  components: { CommentInput, ComentList },
  setup() {
    const data = reactive({
      conmmentList: [],
      asList: [
        {
          id: 1,
          name: 'jack',
          time: '12-2',
          children: [{
            id: 2,
            name:'aa',
          }]
        }
      ],
    });
    return {
      data,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
