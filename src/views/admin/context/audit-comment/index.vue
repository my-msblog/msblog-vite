<template>
  <div class="table-bg">
    <div class="mb10 flex">
      <div>
        <el-button :icon="Delete" type="danger" @click="handleDelete({})">{{ $t('button.deleted') }}</el-button>
        <el-button :icon="Check" type="primary" @click="handleEdit({})">{{ $t('button.audit') }}</el-button>
      </div>
      <div class="grow-auto"></div>
      <div class="fr">
        <el-button :icon="RefreshRight" @click="handleRefresh" />
      </div>
    </div>
    <el-table 
      ref="tableRef"
      v-loading="data.loading"
      :data="data.list" 
      style="width: 100%" 
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="id" prop="id" />
      <el-table-column label="评论" prop="content" />
      <el-table-column label="文章标题" prop="articleTitle" />
      <el-table-column label="发布人" prop="username" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="状态" prop="status">
        <template #default="scope">
          <el-tag 
            effect="plain" 
            :type="['', 'success', 'danger'][scope.row.status]" 
          >
            {{ ['待审核', '通过', '未通过'][scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>  
      <el-table-column
        :label="$t('pages.operation')"
        fixed="right"
        align="center"
      >
        <template #default="scope">
          <el-button @click="handleEdit({id: scope.row.id})">{{ $t('button.audit') }}</el-button>
          <el-button type="danger" @click="handleDelete({id: scope.row.id})">{{ $t('pages.delete') }}</el-button>
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
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { getAuditPage, auditCommemt, delComment } from '@/api/admin/context';
import { ElTable, ElMessage } from 'element-plus';
import { RefreshRight, Delete, Check } from '@element-plus/icons-vue';
import { IdDTO } from '@/api/model/custom';
export default defineComponent({
  name: 'AuditComment',
  components: { },
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const multipleSelection = ref<any[]>([]);
    const data = reactive({
      list: [] as any[],
      pagination: { size: 10, page: 1 },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sizes: [5,10,15,20,25,50],
      loading: false,
    });
    const event = {
      handleEdit(dto: IdDTO) {
        const idList = multipleSelection.value.map(i => i.id);
        dto.idList = idList;
        data.loading = true;
        auditCommemt(dto).then(() =>{
          ElMessage({ message: '审核成功' });
          event.handleRefresh();
        }).finally(() => data.loading = false);
      },
      handleDelete(dto: IdDTO) {
        const idList = multipleSelection.value.map(i => i.id);
        dto.idList = idList;
        data.loading = true;
        delComment(dto).then(() => {
          ElMessage({ message: '删除成功' });
          event.handleRefresh();
        }).finally(() => data.loading = false);
      },
      handleSizeChange(size: number) {
        data.pagination.size = size;
        handleInit(data.pagination);
      },
      handleCurrentChange(page: number) {
        data.pagination.page = page;
        handleInit(data.pagination);
      },
      handleRefresh(){
        handleInit({ page: 1, size: 10 });
      },
      handleSelectionChange(val: any[]) {
        multipleSelection.value = val;
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
    onMounted(() => {
      handleInit(data.pagination);
    });
    return {
      data,
      ...event,
      RefreshRight,
      Delete,
      Check
    };
  },
});
</script>

<style lang="scss" scoped>
.el-table {
  &:deep(.el-table__header) {
    thead tr th{
      background-color: #eae9e9a9;
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
