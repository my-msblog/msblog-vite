<template>
  <v-md-preview :text="text" ref="previewRef"></v-md-preview>
</template>
<script lang="ts" >
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default defineComponent({
  name: 'Viewer',
});
</script>
<script setup lang="ts">
interface IProps {
  text: string;
}
interface TitleElement{
  title: any,
  lineIndex: any,
  indent: number,
}
const props = withDefaults(defineProps<IProps>(),{
  text: '# title # content',
});
const emits = defineEmits<{
  (event: 'loadTitle', titles: TitleElement[]): void,
  (event: 'toTitle', anchor: any): void,
}>();
const data = reactive({
  titles: [] as TitleElement[]
});
const previewRef = ref();
const handleAnchorClick =(anchor: any) => {
  const preview = previewRef.value;
  const { lineIndex } = anchor;
  const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    preview.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
};
onMounted(()=> {
  const anchors = previewRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const titles: any[] = Array.from(anchors).filter((title: any) => !!title.innerText.trim());
  if (!titles.length) {
    data.titles = [];
    return;
  }
  const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
  data.titles = titles.map((el) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName),
  }));
  emits('loadTitle', data.titles);
});
defineExpose({
  handleAnchorClick,
});

</script>
