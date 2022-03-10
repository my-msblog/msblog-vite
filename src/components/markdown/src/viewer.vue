<template>
  <v-md-preview :text="context"></v-md-preview>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Viewer',
});
</script>
<script setup lang="ts">

interface IProps {
  context: string;
}
const props = withDefaults(defineProps<IProps>(),{
  context: '# title # content',
});

</script>
