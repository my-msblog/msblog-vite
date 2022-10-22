<template>
  <div class="table-bg">
    <!-- <el-table :data="data.list" style="width: 100%">
      <el-table-column label="id" prop="id" />
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
    </div> -->
    ac
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { getAuditPage } from '@/api/admin/context';
export default defineComponent({
  name: 'AuditComment',
  setup() {
    const data = reactive({
      list: [] as any[],
      pagination: { size: 10, page: 1 },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sizes: [5,10,15,20,25,50],
    });
    const event = {
      handleEdit(id: IdType) {
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
      getAuditPage(dto).then(res => {
        data.list = res.list;
        data.currentPage = res.pageNum;
        data.pageSize = res.pageSize;
        data.total = res.total;
      });
    };
    return {
      data,
      ...event
    };
  },
});
</script>

<style lang="scss" scpoed>
.el-table {
  &:deep(.el-table__header) {
    thead tr th{
      background-color: #fafafa;
    }
  }
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
