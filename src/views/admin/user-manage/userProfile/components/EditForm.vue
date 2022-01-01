<template>
  <el-dialog :title="title" :v-model="dialogFormVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="data.rule"
      inline-message
      :status-icon="true"
      size="medium"
      label-width="100px"
    >
      <el-row :gutter="14">
        <el-col :span="24">
          <el-form-item label="id：" prop="id">
            <el-input
              v-model="data.formData.id"
              readonly
              :disabled="true"
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model="data.formData.username"
              placeholder="请输入用户名"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" prop="sex">
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
          <el-form-item label="邮箱：" prop="email">
            <el-input
              v-model="data.formData.email"
              placeholder="请输入邮箱"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号：" prop="phone">
            <el-input
              v-model="data.formData.phone"
              placeholder="请输入手机号"
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户角色" prop="role">
            <el-select
              v-model="data.formData.role"
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
        <el-button @click="handleClose">{{ $t('button.close') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  inject,
  Ref
} from 'vue';
import Props from '../props';
import { UserProfileVO } from '@/api/model/admin/user-profile';
import { useI18n } from 'vue-i18n';
import { editFormRule, sexOptions, roleOptions } from './data';
import { ElMessageBox } from 'element-plus';
import { adminChangeUser } from '@/api/admin/user-profile';
import { UserTableChangeDTO } from '@/api/model/user-info-model';
import { RoleId } from '@/constant/enums/role';

export default defineComponent({
  name: 'EditForm',
  props: {
    ...Props,
  },
  emits: [ 'close', 'afterChange' ],
  setup(props, { emit }) {
    const { t } = useI18n();
    const formRef = ref();
    const formData = inject('editData', {} as Ref<UserProfileVO>).value as UserProfileVO;
    const data = reactive({
      rule: editFormRule,
      sexOptions: sexOptions,
      roleOptions: roleOptions,
      formData: {
        id: formData.id,
        username: formData.username,
        sex: formData.sex,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
      } as UserProfileVO,
    });

    const handleClose = function () {
      emit('close');
      formRef.value.clearValidate();
      formRef.value.resetFields();
    };
    const handleConfirm = function () {
      ElMessageBox.confirm(t('message.whether_to_modify_information'), t('pages.tips'), {
        confirmButtonText: t('message.confirm'),
        cancelButtonText: t('message.cancel'),
        type: 'warning',
      }).then(() => {
        console.log(data.formData);
        const params: UserTableChangeDTO = {
          id: data.formData.id,
          username: data.formData.username,
          sex: data.formData.sex,
          phone: data.formData.phone,
          email: data.formData.email,
          roleId: RoleId[data.formData.role as keyof typeof RoleId],
        };
        adminChangeUser(params).then(()=>emit('afterChange'));
      });
      handleClose();
    };
    return {
      data,
      formRef,
      formData,
      handleClose,
      handleConfirm,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row{
  height: auto;
}
</style>
