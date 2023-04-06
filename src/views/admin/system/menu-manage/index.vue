<template>
  <div>
    <base-table 
      :column-options="columns"
    >
    </base-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { getMenuTrees } from '@/api/admin/system/menu-manage';
import { columns } from './data';


export default defineComponent({
  name: 'MenuManage',
  setup() {
    const data = reactive({
      list: [] as any[],
    });
   


    onMounted(() => {
      // getMenuTrees().then(res => {
      //     console.log(res);
          
      // });
    });
    return {
      data,
      columns,

    };
  },
});
</script>

<style lang="scss" scoped>
.top-option{
    background-color: white;
}
</style>
