<template>
  <div class="text-left">
    <v-md-editor :model-value="text" :height="height + 'px'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  text: '# hellow',
  height: 500,
});
</script>

