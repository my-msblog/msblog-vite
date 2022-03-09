<template>
  <div>
    <MarkDown 
      ref="markDownRef"
      v-model:value="markDownValueRef"
      @changed="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { MarkDownActionType } from '@/components/markdown';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ArticleWrite',
  setup() {
    const data = reactive({});
    const markDownValueRef = ref<string>('# content');
    const markDownRef = ref<Nullable<MarkDownActionType>>(null);
    function handleChange(v: string) {
      markDownValueRef.value = v;
    }
    function clearValue() {
      markDownValueRef.value = '';
    }
    return { 
      data,
      markDownRef,
      markDownValueRef,
      handleChange,
      clearValue,
    };
  }
});
</script>

<style>

</style>
