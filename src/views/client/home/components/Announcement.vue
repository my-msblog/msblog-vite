<template>
  <el-card>
    <div class="ann-title">
      <el-icon class="bell-icon" :size="18" color="rgb(102, 177, 255)"><BellFilled /></el-icon>
      {{ $t('message.announcement') }}
    </div>
    <div class="ann-context">
      {{ props.context }}
    </div>
    <div class="ann-buttom">
      <div class="ann-user"> {{ props.user }} </div>
      <div class="ann-time"> {{ props.time }}</div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Announcement',
  components: {}
});
</script>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { BellFilled } from '@element-plus/icons-vue';
const { t } = useI18n();
interface IAnnouncement{
  context: string;
  user: string;
  time: string;
}
const props = withDefaults(defineProps<IAnnouncement>(), {
  context: 'null',
  user: '',
  time: '',
});
</script>

<style lang="scss" scoped>
@import "src/styles/el-card.scss";
.ann-title{
  display: flex;
  font-size: var(--el-font-size-medium);
  align-items: center;
  margin: 7px 0;
  .bell-icon{
    margin-right: 5px;
  }
}
.ann-context{
  font-size: var(--el-font-size-base);
  word-wrap: break-word;
  word-break: normal;
  text-align: left;
}
.ann-buttom{

  color: #909399;
  padding: 10px 0;
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,
    Helvetica Neue,Lato,Roboto,PingFang SC,Microsoft YaHei,sans-serif!important;
  font-size: var(--el-font-size-small);
  .ann-user{

    float: right;
  }
  .ann-time{

    float: left;
  }
}
</style>
