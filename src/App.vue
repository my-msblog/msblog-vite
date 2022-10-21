<template>
  <el-config-provider :locale="locale">
    <router-view class="root-view" />
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed, ref, getCurrentInstance } from 'vue';
import ZhLocale from 'element-plus/lib/locale/lang/zh-cn';
import EhLocale from 'element-plus/lib/locale/lang/en';

const { proxy } = getCurrentInstance() as any;
const language = ref<string>(proxy.$i18n.locale);
const locale = computed(() => (language.value === 'zh' ? ZhLocale : EhLocale));

</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",
    Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,
    "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",
    "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.root-view{
  min-height: 650px;
}
</style>
