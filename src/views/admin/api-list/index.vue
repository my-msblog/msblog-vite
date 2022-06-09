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
              {{ item.requestType === '' ? 'ALL' : item.requestType }}
            </el-tag>
            &nbsp;&nbsp;{{ item.requestUrl }}
          </span>
        </template>
        <div class="request-body">
          <el-descriptions
            :title="$t('pages.api_descriptions_title')"
            :column="1"
            border
            size="large"
          >
            <el-descriptions-item :label="$t('pages.controller_name')">
              {{ item.controllerName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.method_name')">
              {{ item.methodName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.request_type')">
              {{ strIsEmpty(item.requestType) ? 'ALL REQUEST' : item.requestType }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.request_url')">
              {{ item.requestUrl }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.methed_parma_types')">
              {{ item.methodParmaTypes }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.return_name')">
              {{ item.returnName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.annotationValue')">
              {{ item.annotationValue }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('pages.return_value_map')">
              <pre>{{ item.returnValueMap }}</pre>
            </el-descriptions-item>
          </el-descriptions>
        </div>
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
    });
    const handleRequestType = (param: string): string => {
      param = param.toLocaleLowerCase();
      return strIsEmpty(param)
        ? ''
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
      });
    });
    return {
      data,
      handleRequestType,
      strIsEmpty,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-wapper {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  .tab-list {
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
      .el-tabs__item {
        padding: 0 12px;
        text-align: left;
        font-weight: 350;
        font-size: 12px;
      }
      .is-active {
        background-color: #f9f9fc;
      }
      .el-tabs__nav{
      height:580px;
      overflow: auto;
    }
    }
    .request-body {
      text-align: left;
      margin-left: 5px;
      margin-top: 10px;
      &:deep(.el-descriptions__content){
        font-weight: 500;
        pre{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
           Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
          font-weight: 500;
        }
      }
    }
  }
}
</style>
