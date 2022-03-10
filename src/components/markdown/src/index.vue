<template>
  <v-md-editor :v-model="text" height="400px"></v-md-editor>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MarkDown'
});
</script>
<script setup lang="ts">
interface IProps{
  text: string
}
const props = withDefaults(defineProps<IProps>(),{
  text: '#hellow',
});
</script>
