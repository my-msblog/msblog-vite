<template>
  <div class="tabs-wapper">
    <el-tabs
      class="tab-list"
      tab-position="left"
      type="card"
      :stretch="true"
    >
      <el-tab-pane v-for="(item, index) in data.list" :key="index">
        <template #label>
          <span>
            <el-tag size="small" :type="handleRequestType(item.requestType)">
              {{ (item.requestType === '' ? 'ALL' : item.requestType) }}
            </el-tag>
            &nbsp;&nbsp;{{ item.requestUrl }}
          </span>
        </template>
        <pre style="text-align: left">{{ item }}</pre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getAllApi } from '@/api/admin/api-list';
import { RequestItemVO } from '@/api/model/admin/api-list';
import { strIsEmpty } from '@/utils';

export default defineComponent({
  name: 'ApiList',
  setup() {
    const data = reactive({
      list: [] as RequestItemVO[],
      aslist: [
        { requestType: 'get' },
        { requestType: 'post' },
        { requestType: 'delete' },
        { requestType: 'post' },
      ],
    });
    const handleRequestType = (param: string): string => {
      param = param.toLocaleLowerCase();
      return strIsEmpty(param)
        ? 'info'
        : param.includes('get')
        ? 'success'
        : param.includes('post')
        ? 'warning'
        : param.includes('delete')
        ? 'danger'
        : 'info';
    };
    onMounted(() => {
      getAllApi().then((res) => {
        data.list = res;
        console.log(res);
      });
    });
    return {
      data,
      handleRequestType,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-wapper {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  .el-tabs--border-card{
    border: none;
    box-shadow: none;
  }
  .tab-list {
    height: 500px;
    &:deep(.el-tabs__nav-wrap) {
     // padding: 0 !important;
      .el-tabs__nav-prev {
        //display: none;
       left: 0;
      }
      .el-tabs__nav-next {
        //display: none;
        right: 0;
      }
      .el-tabs__item{
        padding: 0 12px;
        text-align: left;
        font-weight: 350;
        font-size: 12px;
      }
      .is-active{
        background-color: #f9f9fc;
      }
    }
  }
}
</style>
