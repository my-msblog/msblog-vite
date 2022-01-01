<template>
  <el-dropdown class="ll_down" style="" @command="change">
    <span class="el-dropdown-link">
      {{ $t('message.language') }}
      <el-icon> <ArrowDown /> </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Language',
});
</script>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ArrowDown } from '@element-plus/icons-vue';
import { reactive, getCurrentInstance } from 'vue';

const { t } = useI18n();
const data = reactive({
  language: 'zh',
  title: '',
});
const { proxy }: any = getCurrentInstance();
function change(type: string) {
  proxy.$i18n.locale = type;
  data.language = proxy.$i18n.locale;
}
</script>
<style lang="scss">
.ll_down{
  margin-left: 15px;
  color: rgba(255,255,255,0.9);
  text-align: center;
  .el-dropdown-link{
    cursor: pointer;
  }
}
</style>
