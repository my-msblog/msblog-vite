<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  unref,
  nextTick,
  watch,
  onBeforeUnmount,
  onDeactivated,
} from 'vue';
import type { Ref } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useModalContext } from '@/hooks/useModalContext';
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated';
export default defineComponent({
  name: 'MarkDown',
  inheritAttrs: false,
  props: {
    height: { type: Number, default: 360 },
    value: { type: String, default: '' },
  },
  emits: ['changed', 'get', 'update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<ElRef>(null);
    const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
    const initedRef = ref(false);
    const instance = {
      getVditor: (): Vditor => vditorRef.value!,
    };
    const modalFn = useModalContext();
    const valueRef = ref(props.value || '');
    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value) {
          instance.getVditor()?.setValue(v);
        }
        valueRef.value = v;
      }
    );
    function init() {
      const wrapEl = unref(wrapRef) as HTMLElement;
      if (!wrapEl) return;
      const bindValue = { ...attrs, ...props };
      const insEditor = new Vditor(wrapEl, {
        theme: 'classic',
        lang: unref('zh_CN'),
        mode: 'sv',
        fullscreen: {
          index: 520,
        },
        preview: {
          actions: [],
        },
        input: (v) => {
          valueRef.value = v;
          emit('update:value', v);
          emit('changed', v);
        },
        after: () => {
          nextTick(() => {
            modalFn?.redoModalHeight?.();
            insEditor.setValue(valueRef.value);
            vditorRef.value = insEditor;
            initedRef.value = true;
            emit('get', instance);
          });
        },
        blur: () => {
          //unref(vditorRef)?.setValue(props.value);
        },
        ...bindValue,
        cache: {
          enable: false,
        },
      });
    }
    function destroy() {
      const vditorInstance = unref(vditorRef);
      if (!vditorInstance) return;
      try {
        vditorInstance?.destroy?.();
      } catch (error) {
        //
      }
      vditorRef.value = null;
      initedRef.value = false;
    }
    onMountedOrActivated(init);

    onBeforeUnmount(destroy);
    onDeactivated(destroy);
    return {
      wrapRef,
      ...instance,
    };
  },
});
</script>
