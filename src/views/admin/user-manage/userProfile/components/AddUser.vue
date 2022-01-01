<template>
  <el-dialog :title="title" :v-model="dialogFormVisible">
    <el-form
      ref="formRef"
      :rules="data.rule"
      inline-message
      :status-icon="true"
      size="medium"
      label-width="100px"
    >
      <el-row :gutter="14">
        <el-col :span="24">
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="data.form.username"
              placeholder="请输入用户名"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码：" prop="pwd">
            <el-input
              v-model="data.form.pwd"
              placeholder="请输入密码"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="data.form.sex" size="medium">
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
          <el-form-item label="邮箱：" prop="email">
            <el-input
              v-model="data.form.email"
              placeholder="请输入邮箱"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机：" prop="phone">
            <el-input
              v-model="data.form.phone"
              placeholder="请输入手机号"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户角色" prop="role">
            <el-select
              v-model="data.form.role"
              placeholder="请选择用户角色"
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in data.roleOptions"
                :key="index"
                :label="item.value"
                :value="item.label"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleReset">{{ $t('button.reset') }}</el-button>
        <el-button @click="handleClose">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import Props from '../props';
import { RoleId } from '@/constant/enums/role';
import { roleOptions, sexOptions } from './data';
import { adminAdd } from '@/api/admin/user-profile';
import { useI18n } from 'vue-i18n';
import { UserTableChangeDTO } from '@/api/model/user-info-model';

export default defineComponent({
  name: '',
  props: {
    ...Props,
  },
  emits: ['close', 'addSuccess'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const formRef = ref();
    const data = reactive({
      rule: [],
      sexOptions: sexOptions,
      form: {
        username: '',
        sex: 0,
        pwd: '',
        phone: '',
        email: '',
        role: RoleId[3],
      },
      roleOptions: roleOptions,
    });
    const handleClose = function (){
      emit('close');
      handleReset();
    };
    const handleReset = () => {
      formRef.value.resetFields();
    };
    const handleConfirm = () => {
      ElMessageBox.confirm(t('message.confirm_submit'), t('pages.tips'), {
        confirmButtonText: t('message.confirm'),
        cancelButtonText: t('message.cancel'),
        type: 'warning',
      }).then(() => {
        const params: UserTableChangeDTO = {
          username:data.form.username,
          sex: data.form.sex,
          pwd: data.form.pwd,
          phone: data.form.phone,
          email: data.form.email,
          roleId: RoleId[data.form.role as keyof typeof RoleId]
        };
        adminAdd(params).then((res) => {
          ElMessage({
            type: 'success',
            message: res,
          });
          emit('addSuccess');
        });
      });
      handleClose();
      handleClose();
    };
    return {
      formRef,
      data,
      handleClose,
      handleConfirm,
      handleReset,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row{
  height: auto;
}
</style>
