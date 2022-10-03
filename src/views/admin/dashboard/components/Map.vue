<template>
  <div></div>
  <!-- <BaseEcharts /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
export default defineComponent({
  name: 'ChinaMap',
  props: {},
  setup() {
    onMounted(async () => {
      // const json = (await (await import('./china.json')).default) as any;
    });
  },
});
</script>

<style>

</style>
