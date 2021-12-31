<template>
  <el-card>
    <div class="run-title">
      <el-icon class="title-icon" :size="18" color="#F56C6C">
        <TrendCharts />
      </el-icon>
      {{ $t('message.website_situation') }}
    </div>
    <div class="run-main-info">
      <div>time</div>
      <div>{{ data.timer }}</div>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
export default defineComponent({
  name: 'Analysis',
});
</script>
<script lang="ts" setup>
import { TrendCharts } from '@element-plus/icons-vue';
interface AnalysisProps {
  runtime: string,
  total: number,
}
const props = withDefaults(defineProps<AnalysisProps>(), {
  runtime: '2021-11-02 00:00:00',
  total: 0,
});
const data = reactive({
  timer: '' as string,
});
function setTime() {
  const createTime = new Date(props.runtime);
  const nowTime = new Date();
  const differ = (nowTime.getTime() - createTime.getTime());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDay = Math.floor(differ/msPerDay );
  const diffHour = nowTime.getHours();
  const diffMinutes = nowTime.getMinutes();
  const diffSeconds = nowTime.getSeconds();
  data.timer = diffDay + '天' + diffHour + '小时'+diffMinutes + '分' + diffSeconds + '秒';
}
onMounted(() =>{
  setInterval(setTime, 1000);
});
</script>
<style lang="scss" scoped>
@import "src/styles/el-card.scss";
.run-title{
  display: flex;
  font-size: var(--el-font-size-medium);
  align-items: center;
  margin: 7px 0;
  .title-icon{
    margin-right: 5px;
  }
}
.run-main-info{
  font-size: var(--el-font-size-base);
  word-wrap: break-word;
  word-break: normal;
}
</style>
