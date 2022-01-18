<template>
  <el-icon :size="size" :color="color">
    <Icon :icon="name" />
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElIcons',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
});
</script>

