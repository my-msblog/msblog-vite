<template>
  <div class="wrap">
    <div v-if="headerShow" class="header">
      <slot name="header"></slot>
      <el-tooltip
        class="item"
        effect="dark"
        content="刷新"
        placement="top"
      >
        <el-button
          class="refresh"
          :icon="RefreshLeft"
          @click="onRefresh"
        />
      </el-tooltip>
    </div>

    <!-- 表格 -->
    <el-table
      class="table"
      :stripe="false"
      :height="height"
      :data="tableData"
      :border="hasBorder"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="selectionShow"
        type="selection"
        width="50"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="hasIndex"
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="80"
      />
      <!-- 其他 -->
      <template v-for="item in columnOptions">
        <!-- 插槽列 -->
        <el-table-column
          v-if="item.columnType"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :header-align="item.headerAlign || 'center'"
          :align="item.align || 'center'"
        >
          <template #default="{ row }">
            <slot :name="item.soltName" :data="row"></slot>
          </template>
        </el-table-column>
        <!-- 非插槽列 -->
        <el-table-column
          v-else
          :key="item.label + 1"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :header-align="item.headerAlign || 'center'"
          :align="item.align || 'center'"
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
    <div v-if="paginationShow" class="pagination">
      <el-pagination
        :page-sizes="[10, 20, 30, 50, 100]"
        :current-page="data.currentPage"
        :page-size="data.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { RefreshLeft } from '@element-plus/icons-vue';
import { Page, Column } from './data';

interface IProps{
  height?: string | number;
  tableData: Array<any>;
  columnOptions: Array<Column>;
  total?: number;
  hasIndex?: boolean;
  hasBorder?: boolean;
  selectionShow?: boolean;
  paginationShow?: boolean;
  headerShow?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  tableData: () => [],
  total: 0,
  hasIndex: true,
  hasBorder: true,
  selectionShow: true,
  paginationShow: true,
  headerShow: true,
});
const emits = defineEmits<{
  (e: 'selectionChange', val: any[]): void,
  (e: 'tableUpdate', params: Page): void,
}>();

const data = reactive({
  currentPage: 1,
  pageSize: 10,
});

const handleCurrentChange = (val: number) => {
  data.pageSize = val;
  emits('tableUpdate', wrapperParams());
};

const handleSizeChange = (val: number) => {
  data.pageSize = val;
  emits('tableUpdate', wrapperParams());
};

const selectionChange = (e: any[]) => {
  emits('selectionChange', e);
};

const onRefresh = () => {
  data.currentPage = 1;
  data.pageSize = 10;
  emits('tableUpdate', wrapperParams());
};


function wrapperParams(){
  return { page: data.currentPage, size: data.pageSize };
}
onMounted(() => {
  onRefresh();
});
</script>

<style lang="scss" scoped>
.header{
  margin: 10px 0;
  .refresh{
    float: right
  }
}
.wrap {
  padding: 0 10px 10px 10px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.wrap .pagination{
  margin-top: 10px;
  margin-left: auto;
}
</style>
