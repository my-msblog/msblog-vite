<template>
  <div class="text-left">
    <v-md-editor
      v-model="text"
      :height="height + 'px'"
      @change="onValue"
      @copy-code-success="handleCopyCodeSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'MarkDown',
});
</script>
<script setup lang="ts">
interface IProps {
  text: string;
  height: number;
}
const props = withDefaults(defineProps<IProps>(), {
  text: '# hello',
  height: 600,
});

const emits = defineEmits<{
  (event: 'change', text: string): void
}>();

const { text } = toRefs(props);

const onValue = (text: string) => {
  emits('change', text);
  
};
const handleCopyCodeSuccess = () => {
  ElMessage.success('复制成功');
};
</script>

