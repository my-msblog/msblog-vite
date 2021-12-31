<template>
  <div>
    <div class="banner">
      <p class="a_title">{{ $t('bar.archive') }}</p>
    </div>
    <FlowCard class="archive-card">
      <h1 class="card-title">{{ $t('pages.archive') }}</h1>
      <el-timeline class="time-line">
        <el-timeline-item
          v-for="(activity, index) in data.list"
          :key="index"
          :hollow="true"
          :type="handleColor(index)"
          placement="top"
          :timestamp="dateFormat(activity.timestamp, 'yyyy-MM-dd')">
          
          <el-card @click="handleCardClick(activity.id)">
            <el-skeleton
              :rows="2"
              animated
              :loading="data.loading">
              <h4>{{ activity.context }}</h4>
              <p> {{ activity.timestamp }}</p>
            </el-skeleton>
          </el-card>
       
        </el-timeline-item>
      </el-timeline>
      <el-pagination
        background
        class="page"
        layout="prev, pager, next"
        @current-change="handlePageChange"
        :pager-count="5"
        :page-count="data.page.count"
        :default-current-page="1"
        :page-size="data.pagination.size"
        :current-page="data.page.currentPage"
        :total="data.page.total" />
    </FlowCard>
    
  </div>
  
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getArchivePage } from '@/api/client/acrhive';
import { BaseDTO } from '@/api/model/core';
import { AcrhiveVO } from '@/api/model/client/acrhive';
import { dateFormat } from '@/utils/DateUtils';

export default defineComponent({
  name: 'Archive',
  setup() {
    const data = reactive({
      pagination: {
        size: 5,
        page: 1,
      },
      page: {
        total: 0 as number,
        currentPage: 1 as number,
        count: 0 as number,
      },
      list: [] as AcrhiveVO[],
      loading: false,
    });
    const handleArchivePage = async function(dto: BaseDTO) {
      data.loading = true;
      await getArchivePage(dto).then((res) => {
        data.list = res.list;
        data.page.total = res.total;
        data.page.currentPage = res.pageNum;
        data.page.count = res.pages;
      });
      data.loading = false;
    };
    const handlePageChange = (page?: number) => {
      if(page){
        data.pagination.page = page;
      }
      handleArchivePage(data.pagination);
    };
    const handleColor = function(index: number): string {
      const type = index % 4;
      switch (type){
        case 0:
          return 'primary';
        case 1:
          return 'success';
        case 2:
          return 'warning';
        case 3:
          return 'danger';
        default:
          return 'info';
      }
    };
    const handleCardClick = function(id: number){
      //路由跳转，文章页面
    };
    onMounted(() => {
      handleArchivePage(data.pagination);
    });
    return {
      data,
      handleColor,
      dateFormat,
      handleCardClick,
      handlePageChange,
    };
  },
});
</script>
<style lang="scss" scoped>
@media(min-width: 715px){
  .banner {
    height: 350px;
    overflow: hidden;
    text-align: center;
    background-color: #49b1f5 !important;
    animation: header-effect 1s;
    background: url("@/assets/background/archive.jpg") center center / cover no-repeat
  }
  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 24px;
    font-weight: bold;
  }
}
.archive-card{
  margin: 48px 250px 68px 250px;
  padding: 15px 10px 10px !important;
  text-align: center;
  .time-line{
    text-align: left;
    .el-card{
      padding: 10px;
      &:deep(.el-card__body){
        padding: 15px;
        h4{
          margin: 15px 0;
        }
        p{
          color: rgb(85, 79, 79);
          margin: 10px 0;
        }
      }
    }
    .el-card:hover{
      box-shadow:0 5px 8px 6px rgb(6 16 26 / 12%);
    }
  }
  .card-title{
     text-align: center;
     margin-bottom: 30px;
  }

  .page{
    &:deep(button){
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
    &:deep(.el-pager){
     .number{
       border-radius: 4px;
       background-color: #fff;
       box-shadow: 0 2px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
     }
     li:not(.active):hover{
       color: rgb(0, 196, 182);
     }
     .more{
       border-radius: 4px;
       box-shadow: 0 2px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
       background-color: #fff;
     }
     .active{
       background-color: rgb(0, 196, 182) !important;
       box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
     }
    }
  }
}
</style>
