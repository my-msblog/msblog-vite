<template>
  <el-card
    class="card"
    :style="{ 'border-radius': props.radius + 'px',
              'padding': props.padding + 'px',
              'shadow': props.shadow}">
    <slot /> 
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'FlowCard',
};
</script>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  padding?: number,
  radius?: number,
  shadow?: string,
}>(), {
  padding: 10,
  radius: 8,
  shadow: '0 4px 8px 6px rgb(7 17 27 / 6%)'
});
</script>
<style lang="scss" scoped>
.card{
  max-width: 1200px;
}
.card:hover{
  box-shadow:0 5px 8px 6px rgb(6 16 26 / 12%);
}
</style>