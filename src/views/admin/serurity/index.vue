<template>
  <div> sery</div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Context',
  setup() {
    const data = reactive({});
    return {
      data,
    };
  },
});
</script>

<style scoped>

</style>
