<template>
  <svg :class="[prefixCls, 'svg-icon-spin']" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue';
import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 26,
    },
    spin: {
      type: Boolean,
      default: false,
    },
     color: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('svg-icon');
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    const getStyle = computed((): CSSProperties => {
      const { size } = props;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
      return {
        width: s,
        height: s,
      };
    });
    return { symbolId, prefixCls, getStyle };
  },
});
</script>
<style lang="scss" scoped>
.svg-icon-spin {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
