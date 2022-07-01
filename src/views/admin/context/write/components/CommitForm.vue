<template>
  <el-dialog v-model="data.display" :title="$t('pages.article_commit')">
    <el-form :model="data.form">
      <el-form-item :label="$t('pages_desc')">
        <el-input v-model="data.form.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          multiple
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-progress="upload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <div v-else>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleShow">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'CommitForm',
});
</script>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { UploadProps } from 'element-plus';
import COS from 'cos-js-sdk-v5';
import { cos as setting_cos } from '@/setting.json';
interface IProps{
  show: boolean;
}
interface Form{
  desc: string;
  cover: string;
}
interface IData{
  form: Form;
  display: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  show: false,
});
const emits = defineEmits<{
  (e: 'onShow'): void,
  (e: 'onCommit', data: Form): void,
}>();
const cos = new COS({
  SecretId: setting_cos.ID,
  SecretKey: setting_cos.KEY,
});
const imageUrl = ref<string>('');
const data = reactive<IData>({
  form: {
    desc:'',
    cover: '',
  },
  display: props.show,
});
const handleShow = () => {
  emits('onShow');
};
const handleSubmit = () => {
  emits('onCommit', data.form);
};
const handleAvatarSuccess: UploadProps['onSuccess'] = (res, file) => {

};
const upload = () => {

};
const beforeAvatarUpload = () => {

};
</script>

<style>

</style>
