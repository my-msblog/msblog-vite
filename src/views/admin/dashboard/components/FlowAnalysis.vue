<template>
  <el-card>
    <BaseEcharts :options="options" />
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataArray } from '@/constant/type';
import { EChartsOption } from 'echarts';
export default defineComponent({
  name: 'FlowAnalysis',
  props: {
    xAxisProp: {
      type: Array as PropType<Array<string>>,
      default: DataArray<string>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
    },
    legendData: {
      type: Array as PropType<Array<string>>,
      default: DataArray<string>(['人流量']),
    },
    dataProp: {
      type: Array as PropType<Array<number>>,
      default: DataArray<number>([50, 230, 224, 218, 135, 147, 260])
    }
  },
  setup(props) {
    const { t } = useI18n();
    const options = computed<EChartsOption>(() => {
      return {
        title: {
          text: t('pages.flow_statistics'),
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        grid: { left: '1%', right: '2%', top: '15%', bottom: 0, containLabel: true },
        legend: {
          data: ['人流量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xAxisProp,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
            axisTick: {
              show: false,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
        series: [
          {
            name: '人流量',
            data: props.dataProp,
            smooth: true,
            stack: 'Total',
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
            label: {
              show: true,
              position: 'top'
            },
            emphasis: {
              focus: 'series'
            },
          }
        ]
      };
    });
    return {
      options,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
