<template>
  <el-icon :size="size" :color="color">
    <Icon :icon="name" />
  </el-icon>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'ElIcons',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: '',
    },
  },
});
</script>

