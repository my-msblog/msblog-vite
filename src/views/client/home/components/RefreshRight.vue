<template>
  <el-tooltip
    class="item"
    effect="light"
    :content="$t('message.click_to_refresh')"
    placement="top"
  >
    <el-button type="danger" icon="el-icon-refresh-right" @click="onClick">{{ $t('button.loading_failure') }}</el-button>
  </el-tooltip>
</template>
<script lang="ts">
export default {
  name: 'RefreshRight',
};
</script>
<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void
}>();
const onClick = () => {
  emit('click');
};
</script>

<style scoped>

</style>
