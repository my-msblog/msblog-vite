<template>
  <el-dialog v-model="display" :title="$t('pages.article_commit')">
    <el-form :model="data.form">
      <el-form-item :label="$t('pages.desc')+'：'">
        <el-input v-model="data.form.desc" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('pages.cover')+'：'">
        <el-upload
          class="upload-demo"
          drag
          action=""
          multiple
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
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
import { computed, defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  name: 'CommitForm',
});
</script>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage, UploadProps, UploadRawFile } from 'element-plus';
import COS from 'cos-js-sdk-v5';
import { cos as setting_cos } from '@/setting';
interface IProps{
  show: boolean;
  desc: string;
  cover: string;
}
interface Form{
  desc: string;
  cover: string;
}
interface IData{
  form: Form;
  display: boolean;
  uploadFile: UploadRawFile;
}
const props = withDefaults(defineProps<IProps>(), {
  show: false,
  desc: '',
  cover: '',
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
    desc: '',
    cover: '',
  },
  display: props.show,
  uploadFile: {} as UploadRawFile,
});
const display = computed(() => props.show);
const handleShow = () => {
  emits('onShow');
};
const handleSubmit = () => {
  emits('onCommit', data.form);
};
const handleSuccess: UploadProps['onSuccess'] = (_, file) => {
  imageUrl.value = URL.createObjectURL(file.raw as UploadRawFile);
};
const upload = () => {
  const res = data.uploadFile;
  cos.putObject({
    Bucket: setting_cos.bucket,
    Region: setting_cos.region,
    Key: res.name,
    StorageClass: 'STANDARD',
    Body: res,
  }, (_, res) => {
    if (res.statusCode === 200) {
      imageUrl.value = `https:${res.Location}`;
      data.form.cover = imageUrl.value;
    } else {
      ElMessage.error('上传失败!');
    }
  });
};
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Picture size can not exceed 2MB!');
    return false;
  }
  data.uploadFile = rawFile;
  return true;
};
</script>

<style>

</style>
