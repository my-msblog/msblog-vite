<template>
  <div>
    <BaseTable
      v-loading="data.loading"
      :table-data="data.tableData"
      :column-options="data.columns"
      :total="data.total"
      @table-update="tableUpdate"
    >
      <template #header>
        <el-button type="primary" @click="openEdit">新增标签</el-button>
      </template>
      <template #action="{ data }">
        <el-button size="small" @click="openEdit(data)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(data)">删除</el-button>
      </template>
    </BaseTable>
    <TagEdit 
      v-model:visiable="data.showEdit"
      :data="data.current"
      :is-edit="data.isEdit"
      @done="tableUpdate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { getTagPage, removeTag } from '@/api/admin/context/tag';
import TagEdit from './components/tag-edit.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'TagManagement',
  components: { TagEdit },
  setup() {
    const data = reactive({
      tableData: [] as any[],
      columns: [
        { label: '标签名', prop: 'name' },
        { label: '标签', prop: 'nameZh' },
        { label: '操作', prop: 'action', columnType: true, soltName: 'action' },
      ],
      total: 0,
      form: {
        page: 1,
        size: 10,
        key: '',
      },
      loading: false,
      isEdit: false,
      current: {},
      showEdit: false,
    });
    const tableUpdate = (params?: any) => {
      Object.assign(data.form, params);
      data.loading = true;
      getTagPage(data.form).then(res => {
        data.total = res.total;
        data.tableData = res.list;
      }).finally(() => data.loading = false);

    };
    const openEdit = (row?: any) => {
      data.current = row;
      data.isEdit = row !== undefined;
      data.showEdit = true;
    };
    const handleDelete = (row: any) => {
      data.loading = true;
      removeTag(row.id).then(() => {
        ElMessage.success('删除成功');
        tableUpdate();
      }).finally(() => data.loading = false);
    };
    return { 
      data,
      tableUpdate,
      openEdit,
      handleDelete,
    };
  }
});
</script>

<style>

</style>
