<template>
  <el-dialog 
    :model-value="show"
    width="550px"
    :title="t('pages.register')"
    destroy-on-close
    @close="handleClose"
  >
    <div class="form-body">
      <el-form 
        ref="formRef" 
        :model="form" 
        label-width="70px" 
        :rules="rules" 
      >
        <el-form-item :label="t('pages.username')+':'" prop="username">
          <el-input
            v-model="form.username"
            :placeholder="t('message.enter_username')"
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>

        <el-form-item :label="t('pages.password')+':'" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            :placeholder="t('message.enter_password')"
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>
 
        <el-form-item :label="t('pages.sex')+':'" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.label">
              {{ item.value }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="t('pages.email')+':'" prop="email">
          <el-input
            v-model="form.email"
            :placeholder="t('message.enter_email')"
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>

        <el-form-item :label="t('pages.phone')" prop="phone">
          <el-row :gutter="15">
            <el-col :span="10">
              <el-input
                v-model="form.phone"
                :placeholder="t('message.input_phone')"
                clearable
                :style="{width: '100%'}"
              />
            </el-col>
            <el-col :span="6">
              <el-input
                v-model="form.code"
                :placeholder="t('message.captcha')"
                clearable
                :style="{width: '100%'}"
              />
            </el-col>
            <el-col :span="6">
              <el-button :type="loading ? 'primary' : 'info'" :disabled="!loading" @click="getCode">
                <span v-show="loading">{{ t('message.get_captcha') }}</span>
                <span v-show="!loading" class="count"> {{ count }} s</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item :label="t('pages.introduction')" prop="introduction">
          <el-input
            v-model="form.introduction"
            type="textarea"
            :placeholder="t('message.introduce_yourself_briefly')"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-divider style="margin: 0 0 10px 0;" />
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ t('button.cancel') }}</el-button>
        <el-button
          v-loading="registerLoaing"
          type="primary"
          @click="handleRegister"
        >{{ t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { getSMS } from '@/api/sys';
import { PhoneDTO } from '@/api/model/sys-model';
import { Encrypt } from '@/utils/Secret';
import { register } from '@/api/client/login';
import { useI18n } from '@/hooks/useI18n';
import { formRule } from '../data';

const { t } = useI18n();
const props = defineProps({
  show: Boolean,
});
const emits = defineEmits(['close']);
const form = reactive({
  username: '',
  password: '',
  confirm: '',
  phone: '',
  email: '',
  sex: 1,
  introduction: '',
  code: '',
});
const rules = reactive<FormRules>(formRule);
const count = ref<number>(0);
const loading = ref<boolean>(true);
const registerLoaing = ref<boolean>(false);
const formRef = ref<FormInstance>();
const sexOptions = [
  { label: 1, value: t('sex.male') },
  { label: 0, value: t('sex.female') }
];

const getCode = async function () {
  const param: PhoneDTO = { phone: form.phone };
  if (param.phone && await (formRef as any).value.validateField('phone')) {
    getSMS(param).then(() => {
      ElMessage({ message: t('message.sms_send_success'), type: 'success' });
      count.value = 60;
      loading.value = false;
      const timer = setInterval(() => {
        if (count.value > 0 && count.value <= 60) {
          count.value--;
        } else {
          clearInterval(timer);
          loading.value = true;
        }
      }, 1000);
    }).catch();
  } else {
    ElMessage.error({
      type: 'error',
      message: t('message.input_phone'),
      duration: 2 * 1000,
    });
  }
};

const handleRegister = async() => {
  const flag = await (formRef as any).value.validate();
  if (!flag){
    return;
  }
  registerLoaing.value = true;
  const param = {
    ...form,
    pwd: Encrypt(form.password)
  };
  register(param).then(() => {
    ElMessage({ message: '注册成功', type: 'success' });
    handleClose();
  }).finally(() => registerLoaing.value = false);
};
const handleClose = () => {
  emits('close');
  (formRef as any).value.resetFields();
};
</script>

<style lang="scss" scoped>
.form-body{
  padding: 0 5px;
}
</style>
