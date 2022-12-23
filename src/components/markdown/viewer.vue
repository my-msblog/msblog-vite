<template>
  <v-md-preview-html
    ref="previewRef"
    :html="toHTML"
    preview-class="vuepress-markdown-body"
    @copy-code-success="handleCopyCodeSuccess"
  ></v-md-preview-html>
</template>
<script lang="ts" >
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { copyToClip } from '@/utils';

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
  text: '',
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
const toHTML = computed(() => {
  return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(props.text));
});
const handleCopyCodeSuccess = (text: string) => {
  copyToClip(text);
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
