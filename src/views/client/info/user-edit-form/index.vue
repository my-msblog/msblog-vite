<template>
  <el-dialog :title="title" :v-model="dialogFormVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="data.rules"
      label-width="100px"
    >
      <div>
        <el-row :gutter="14">
          <el-col :span="24">
            <el-form-item :label="t('pages.username')+':'" prop="username">
              <el-input
                v-model="data.formData.username"
                :placeholder="t('message.enter_username')"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="t('pages.sex')+':'">
              <el-radio-group v-model="data.formData.sex" size="medium">
                <el-radio
                  v-for="(item, index) in data.sexOptions"
                  :key="index"
                  :label="item.label"
                >
                  {{ item.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('pages.email')+':'" prop="email">
              <el-input
                v-model="data.formData.email"
                :placeholder="t('message.enter_email')"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="t('pages.phone')" prop="phone">
              <el-input
                v-model="data.formData.phone"
                :placeholder="t('message.input_phone')"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="0" prop="code">
              <el-input
                v-model="data.formData.code"
                :placeholder="t('message.captcha')"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="0" prop="sendSMS">
              <el-button
                :type="data.show ? 'primary' : 'info'"
                size="medium"
                :disabled="!data.show"
                @click="getCode"
              >
                <span v-show="data.show">{{ t('message.get_captcha') }}</span>
                <span v-show="!data.show" class="count"> {{ data.count }} s</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="t('pages.introduction')" prop="introduction">
              <el-input
                v-model="data.formData.introduction"
                type="textarea"
                :placeholder="t('pages.introduce_yourself_briefly')"
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div>
      <el-button @click="close">{{ $t('message.cancel') }}</el-button>
      <el-button type="primary" @click="handleConfirm">{{ t('message.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
} from 'vue';
import { defaultProp, FormData, rules } from './data';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userUpdate } from '@/api/client/user-info';
import { getSMS } from '@/api/sys';
import { PhoneDTO } from '@/api/model/sys-model';

export default defineComponent({
  name: 'UserEditForm',
  props: {
    dialogFormVisible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    formData: {
      type: Object as PropType<FormData>,
      default: defaultProp()
    },
  },
  emits: [ 'closeForm' ],
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();
    const formRef = ref();
    const data = reactive({
      rules: rules,
      show: true,
      count: 0,
      formData: props.formData,
      sexOptions: [{
        label: 1,
        value: t('sex.male')
      }, {
        label: 0,
        value: t('sex.female')
      }],
    });
    function handleConfirm() {
      ElMessageBox.confirm(t('message.whether_to_modify_information'), t('message,tips'), {
        confirmButtonText: t('message.confirm'),
        cancelButtonText: t('message.cancel'),
        type: 'warning',
      }).then(() => {
        userUpdate(data.formData).then((res) => {
          store.commit('setUserPhone', res.phone);
          store.commit('setUsername', res.username);
          store.commit('setUserEmail', res.email);
          store.commit('setUserSex', res.sex);
          store.commit('setUserIntroduction', res.introduction);
          close();
          ElMessage.success({
            message: t('message.modified_successfully'),
            duration: 2 * 1000,
            type: 'success'
          });
        }).catch();
      });
    }
    function close() {
      emit('closeForm');
      formRef.value.resetFields();
    }
    const getCode = function() {
      const param: PhoneDTO = {
        phone: data.formData.phone
      };
      if (param.phone) {
        getSMS(param).then(() => {
          ElMessage({
            message: t('message.sms_send_success'),
            duration: 2 * 1000,
            type: 'success'
          });
          data.count = 60;
          data.show = false;
          const timer = setInterval(() => {
            if (data.count > 0 && data.count <= 60) {
              data.count--;
            } else {
              clearInterval(timer);
              data.show = true;
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
    return {
      t,
      data,
      formRef,
      handleConfirm,
      close,
      getCode,
      props,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row{
  height: auto;
}
</style>
