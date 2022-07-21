<template>
  <div class="table-bg">
    <el-table :data="data.list" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column :label="$t('pages.title')" prop="title" />
      <el-table-column :label="$t('pages.writer')" prop="writer" />
      <el-table-column :label="$t('pages.category')" prop="category" />
      <el-table-column :label="$t('pages.description')" prop="description" />
      <el-table-column
        :label="$t('pages.operation')"
        fixed="right"
        align="center"
      >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">{{ $t('pages.edit') }}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">{{ $t('pages.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="form_bottom">
      <el-pagination
        class="bot_page"
        background
        :current-page="data.currentPage"
        :page-sizes="data.sizes"
        :page-size="data.pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getList } from '@/api/admin/context/article';

export default defineComponent({
  name: 'ArticleManagement',
  setup() {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      list: [] as any[],
      pagination: { size: 5, page: 1 },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sizes: [5,10,15,20,25,50],
    });
    const event = {
      handleEdit(id: IdType) {
        router.push('admin/context/write');
      },
      handleDelete(id: IdType) {},
      handleSizeChange(size: number) {
        data.pagination.size = size;
        handleInit(data.pagination);
      },
      handleCurrentChange(page: number) {
        data.pagination.page = page;
        handleInit(data.pagination);
      },
    };
    const handleInit = (dto: BaseDTO) => {
      data.list = [{
        id: 1,
        title: 'sd',
        writer: 'ms',
        description: 'ss',
        category: 'scoped',
      },];
    };
    onMounted(() => {
      handleInit(data.pagination);
    });
    return {
      data,
      ...event,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-table {
  &:deep(.el-table__header) {
    thead tr th{
      background-color: #fafafa;
    }
  }
}
.table-bg{
  background-color: white;
  padding: 25px 15px 15px;
}
.form_bottom{
  overflow:hidden;
  padding: 10px 0 0;
  .bot_btn{
    float: left
  }
  .bot_page{
    float: right;
  }
}
</style>
