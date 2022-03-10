<template>
  <div>
    <MarkDown 
      ref="markDownRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ArticleWrite',
  setup() {
    const data = reactive({});
  
    return { 
      data,
     
    };
  }
});
</script>

<style>

</style>
