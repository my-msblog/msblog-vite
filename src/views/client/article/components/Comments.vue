<template>
  <div>
    <CommentInput />
    Template
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommentInput from './CommentInput.vue';
export default defineComponent({
  name: 'Comments',
  components: { CommentInput },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>

</style>
