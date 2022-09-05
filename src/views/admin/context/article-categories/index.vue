<template>
  <div class="table-bg">
    <div class="mb10">
      <el-row>
        <el-col :span="12" class="text-left">
          <el-button type="primary" @click="handleAdd">{{ $t("pages.add") }}</el-button>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-button :icon="RefreshRight" @click="handleAdd"></el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="data.list"
      border
      style="width: 100%"
      size="large"
    >
      <el-table-column label="id" prop="value" />
      <el-table-column :label="$t('pages.category')" prop="label" />
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
  <UpdateCategory v-model="showUpdate" @close="handleClose" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { RefreshRight } from '@element-plus/icons-vue';
import { categoryList } from '@/api/admin/context/write';
import UpdateCategory from './components/update-category.vue';

export default defineComponent({
  name: 'ArticleCategory',
  components: { UpdateCategory },
  setup() {
    const data = reactive({
      list: [] as any[],
      pagination: { size: 5, page: 1 },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      sizes: [5,10,15,20,25,50],
    });
    const showUpdate = ref<Boolean>(false);
    const event = {
      handleEdit(id: IdType) {},
      handleDelete(id: IdType) {},
      handleAdd() {
        showUpdate.value = true;
      },
      handleSizeChange(size: number) {
        data.pagination.size = size;

      },
      handleCurrentChange(page: number) {
        data.pagination.page = page;
      },
      handleClose() {
        showUpdate.value = false;
      },
    };
    onMounted(() => {
      categoryList().then(res => {
        data.list = res;
      });
    });
    return {
      data,
      ...event,
      RefreshRight,
      showUpdate
    };
  },
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
