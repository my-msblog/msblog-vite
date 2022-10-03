<template>
  <el-dialog
    v-model="data"
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
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  show: boolean,
}>(), {
  show: false,
});
const data = ref<boolean>(props.show);
const emit = defineEmits<{
  (e: 'close'): void
}>();

const handleClose = () => {
  emit('close');
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
