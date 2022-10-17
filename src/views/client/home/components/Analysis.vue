<template>
  <el-card>
    <div class="run-title">
      <el-icon class="title-icon" :size="18" color="#F56C6C">
        <TrendCharts />
      </el-icon>
      {{ $t('message.website_situation') }}
    </div>
    <div class="run-main-info">
      <div class="flex-between run-item">
        <div class="">{{ $t('pages.run_time') }}：</div>
        <div class="item-de">{{ data.timer }}</div>
      </div>
      <div class="flex-between run-item">
        <div class="">{{ $t('pages.visit_num') }}：</div>
        <div class="item-de">{{ total }}</div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Analysis',
});
</script>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { TrendCharts } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
interface AnalysisProps {
  runtime?: string,
  total?: number,
}
const { t } = useI18n();
const props = withDefaults(defineProps<AnalysisProps>(), {
  runtime: '2022-09-02 00:00:00',
  total: 0,
});
const data = reactive({
  timer: '',
});
function setTime() {
  const createTime = new Date(props.runtime);
  const nowTime = new Date();
  const differ = (nowTime.getTime() - createTime.getTime());
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDay = Math.floor(differ/msPerDay );
  data.timer = diffDay + t('constants.day')
      + ' ' + nowTime.getHours() + t('constants.hour')
      + ' ' + nowTime.getMinutes() + t('constants.minute')
      + ' ' + nowTime.getSeconds() + t('constants.seconds');
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
  text-align: left;
  .run-item{
    margin: 10px 0;
    .item-de{
      overflow: hidden;
    }
  }
}
</style>
