<template>
  <div id="preview"></div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Viewer',
});
</script>
<script setup lang="ts">
import { onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
interface IProps {
  context: string;
}
const props = withDefaults(defineProps<IProps>(),{
  context: '# title # content',
});
const rander = (md: string) => {
  Vditor.preview(document.getElementById('preview') as HTMLDivElement,md);
};
onMounted(() => {
  rander(props.context);
});
</script>
