<template>
  <div class="base-echart">
    <div ref="eChartDivRef" :style="{ width: width, height: height }" />
  </div>
</template>


<script lang="ts">
export default {
  name: 'BaseEcharts',
};
</script>
<script lang="ts" setup>
import {
  ref,
  onMounted,
  watchEffect,
  Ref
} from 'vue';
import { EChartsOption } from 'echarts';
import useEchart from '@/hooks/useEchart';

// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption,
    width?: string,
    height?: string,
  }>(),
  {
    width: '100%',
    height: '360px'
  }
);

const eChartDivRef: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const { setOptions } = useEchart(eChartDivRef.value as HTMLDivElement);

  watchEffect(() => {
    setOptions(props.options);
  });
});

</script>
<style lang="scss" scoped>
.base-echart{
  margin: 0;
  background-color:white;
}
</style>

