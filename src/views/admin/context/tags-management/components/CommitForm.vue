<template>
  <el-dialog v-model="show" title="Shipping address">
    <el-form :model="data.form">
      <el-form-item label="Promotion name">
        <el-input v-model="data.form.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones">
        <el-select v-model="data.form.cover" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hendleShow">Cancel</el-button>
        <el-button type="primary" @click="hendleShow">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'CommitForm',
});
</script>
<script setup lang="ts">
interface IProps{
  show: boolean;
}
interface Form{
  desc: string;
  cover: string;
}
interface IData{
  form: Form;
}
interface IEmits{
  
}
const props = withDefaults(defineProps<IProps>(), {
  show: false,
});
const emits = defineEmits<{
  (e: 'onShow'): void,
  (e: 'onCommit', data: Form): void,
}>();
const data = reactive<IData>({
  form: {
    desc:'',
    cover: '',
  }
});
const hendleShow = () => {
  emits('onShow');
};

</script>

<style>

</style>
