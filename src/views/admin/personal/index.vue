<template>
  <el-row :gutter="5">
    <el-col :span="8">
      <el-card shadow="never" class="m-0">
        <div class="flex justify-center my-10">
          <el-avatar
            :size="100"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="dashed" />
        <el-descriptions title="用户信息" :column="1">
          <el-descriptions-item label="姓名:">{{ store.getters.getUsername }}</el-descriptions-item>
          <el-descriptions-item label="电话:">{{ store.getters.getPhone }}</el-descriptions-item>
          <el-descriptions-item label="性别:">{{ ['女', '男'][store.getters.getUserSex] }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card shadow="never" class="m-0">
        <el-tabs v-model="active">
          <el-tab-pane label="基本信息" name="first">
            <el-form
              :model="data.form"
              :rules="rules"
              label-width="90px"
              style="max-width: 450px; padding: 34px 20px 0 20px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="data.form.username" />
              </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="data.form.phone" />
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="data.form.sex" class="ml-4">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="data.form.password" />
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="data.form.checkPassword" />
              </el-form-item>
              <el-button :loading="data.loading" type="primary" @click="submit">确认修改</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from './data';

export default defineComponent({
  name: 'Context',
  setup() {
    const store = useStore();
    const active = ref('first');
    const data = reactive({
      form: {
        username: store.getters.getUsername,
        id: store.getters.getUserId,
        sex: store.getters.getUserSex,
        phone: store.getters.getPhone,
        password: '',
        checkPassword: ''
      },
      loading: false
    });
    const submit = () => {};
    return {
      data,
      active,
      store,
      submit,
      rules,
    };
  },
});
</script>

<style scoped>
.dashed {
  border-top: 2px dashed var(--el-border-color);
  margin: 20px 0;
}
</style>
