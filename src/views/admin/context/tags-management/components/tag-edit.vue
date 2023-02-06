<template>
  <el-dialog 
    :model-value="visiable"
    :title="isEdit ? '编辑' : '新增'"
    @close="updateVisible(false)"
  >
    <el-form>
      <el-form-item label="标签名">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="nameZh"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateVisible(false)">取消</el-button>
        <el-button v-loading="loading" type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { saveTag } from '@/api/admin/context/tag';
import { ref, watch } from 'vue'; 
import { ElMessage } from 'element-plus';
const props = defineProps<{
  data: any | null,
  visiable: boolean,
  isEdit: boolean
}>();
const emits = defineEmits(['update:visiable', 'done']);

const updateVisible = (value: boolean) => {
  emits('update:visiable', value);
};

const name = ref('');
const nameZh = ref('');
const loading = ref(false);

const submit = () => {
  loading.value = true;
  saveTag({
    id: props.data.id,
    name: name.value,
    nameZh: nameZh.value
  }).then(() => {
    ElMessage.success('保存成功');
    emits('done');
    updateVisible(false);
  }).finally(() => loading.value = false);
 
};

watch(
  () => props.visiable,
  (visiable) => {
    if(visiable){
      name.value = props.data.name;
      nameZh.value = props.data.nameZh;
    }
  }
);
</script>

<style>

</style>
