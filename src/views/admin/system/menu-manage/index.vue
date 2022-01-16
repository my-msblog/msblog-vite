<template>
  <div>
    <div class="top-option">
      <el-button size="small">{{ $t('button.remove_item') }}</el-button>
      <el-button size="small" type="primary">{{ $t('button.add') }}</el-button>
    </div>

    <el-tree
      :data="data"
      :props="defaultProps"
      show-checkbox
      accordion
      highlight-current
      default-expand-all
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import type { ElTree } from 'element-plus';
import { getMenuTrees } from '@/api/admin/system/menu-manage';
interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

export default defineComponent({
  name: 'MenuManage',
  setup() {
    const data = reactive({
      treeData: [] as Tree[],
    });
    const treeRef = ref<InstanceType<typeof ElTree>>();
    const defaultProps = {
      children: 'children',
      label: 'label',
    };
    const getCheckedNodes = () => {
      const nodes = treeRef.value!.getCheckedNodes(false, false);
    };
    const handleNodeClick = () => {};
    onMounted(() => {
      // getMenuTrees().then(res => {
      //     data.treeData = res;
      // });
    });
    return {
      data,
      defaultProps,
      getCheckedNodes,
      handleNodeClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-option{
    background-color: white;
}
</style>
