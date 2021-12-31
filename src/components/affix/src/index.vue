<template>
  <div class="affix-placeholder" :style="data.wrapStyle">
    <div class="affix-div" :class="{'affix': data.affixed}" :style="data.styles">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  onUnmounted } from 'vue';
import { Styles, affixProps } from './affixProps';

export default defineComponent({
  name: 'Affix',
  props: affixProps,

  setup(props: any) {
    const data = reactive({
      affixed: false,
      styles: {} as Styles,
      affixedClientHeight: 0,
      wrapStyle: {},
    });
    const instance = getCurrentInstance();
    const getScroll = function(w: Window, top?: boolean){
      let ret = w[`page${(top ? 'Y' : 'X')}Offset`];
      const method = `scroll${top ? 'Top' : 'Left'}`;
      if (typeof ret !== 'number') {
        const d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
          // quirks mode
          ret = d.body[method];
        }
      }
      return ret;
    };
    const getOffset = function (element: Element) {
      const rect = element.getBoundingClientRect();
      const body = document.body;
      const clientTop = element.clientTop || body.clientTop || 0;
      const clientLeft = element.clientLeft || body.clientLeft || 0;
      const scrollTop = getScroll(window, true);
      const scrollLeft = getScroll(window);
      return {
        top: rect.bottom + scrollTop - clientTop - data.affixedClientHeight,
        left: rect.left + scrollLeft - clientLeft
      };
    };
    const offsets = computed(()=>{
      if (props.boundary) {
        return 0;
      }
      return props.offset;
    });
    const handleScroll = () => {
      const scrollTop = getScroll(window, true) + offsets.value; // handle setting offset
      const elementOffset = getOffset(instance?.proxy?.$el);
      if (!data.affixed && scrollTop > elementOffset.top) {
        data.affixed = true;
        data.styles = {
          top: `${offsets.value}px`,
          left: `${elementOffset.left}px`,
          width: `${instance?.proxy?.$el.offsetWidth}px`
        };
        props.onAffix(data.affixed);
      }
      // if setting boundary
      if (props.boundary && scrollTop > elementOffset.top) {
        const el = document.getElementById(props.boundary);
        if (el) {
          const boundaryOffset = getOffset(el);
          if ((scrollTop + offsets.value) > boundaryOffset.top) {
            const top = scrollTop - boundaryOffset.top;
            data.styles.top = `-${top}px`;
          }
        }
      }
      if (data.affixed && scrollTop < elementOffset.top) {
        data.affixed = false;
        data.styles = {};
        props.onAffix(data.affixed);
      }
      if (data.affixed && props.boundary) {
        const el = document.getElementById(props.boundary.slice(1));
        if (el) {
          const boundaryOffset = getOffset(el);
          if ((scrollTop + offsets.value) <= boundaryOffset.top) {
            data.styles.top = 0;
          }
        }
      }
    };
    onMounted(()=> {
      data.affixedClientHeight = instance?.proxy?.$el.children[0].clientHeight;
      data.wrapStyle = { height: `${data.affixedClientHeight}px` };
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    });
    onUnmounted(()=>{
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    });
    return {
      data,
    };
  }
});
</script>

<style lang="sass">
.affix
  position: fixed
</style>
