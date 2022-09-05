<template>
  <el-dialog
    :v-model="show"
    :title="$t('pages.add')"
    width="30%"
    :before-close="handleClose"
  >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t("button.cancel") }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ $t("button.confirm") }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value: boolean,
}>(), {
  value: false,
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

const handleClose = (done: () => void) => {
  emit('close');
  done();
};
const handleSubmit = () => {
  handleClose();
};

</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
