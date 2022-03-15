<template>
  <v-md-preview :text="text"></v-md-preview>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Viewer',
});
</script>
<script setup lang="ts">

interface IProps {
  text: string;
}
const props = withDefaults(defineProps<IProps>(),{
  text: '# title # content',
});

</script>
