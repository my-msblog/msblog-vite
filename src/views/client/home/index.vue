<template>
  <div>
    <div class="home-banner">
      <h3 class="title">欢迎来到我的个人网站</h3>
      <h3 class="titles">这个人很懒，什么都没有说明，试试往下滑动！</h3>
    </div>
    <div class="home_main">
      <el-row class="el-row" :gutter="10">
        <el-col
          :lg="{span:18, offset:0}"
          :sm="{span:20, offset:2}"
          :xs="24"
        >
          <keep-alive>
            <ArticleCards v-loading="data.loading" :article-list="data.articleList" :loading="data.loading" />
          </keep-alive>
          <RefreshRight
            v-if="data.showFailed"
            class="btn-reload"
            @click="handleReload"
          />
          <el-pagination
            v-if="!data.showFailed && !data.loading"
            background
            class="page all-center"
            layout="prev, pager, next"
            :pager-count="5"
            :page-count="data.page.count"
            :default-current-page="1"
            :page-size="data.pagination.size"
            :current-page="data.page.currentPage"
            :total="data.page.total"
            @current-change="handleArticles"
          />
        </el-col>
        <el-col
          class="col-pd  hidden-md-and-down"
          :lg="6"
          :sm="0"
        >
          <div class="card-main">
            <IdCard
              :article="data.idCardValue.article"
              :category="data.idCardValue.category"
              :tags="data.idCardValue.tag"
            />
            <Announcement
              class="announcement-card"
              :context="data.announcement"
              :user="data.ann_user"
              :time="data.ann_time"
            />
            <Analysis class="analysis-card" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getArticlePage, getMainInfo, getAnnouncement } from '@/api/client/home';
import { ArticleCardVO } from '@/api/model/client/home';
import { useI18n } from 'vue-i18n';
import ArticleCards from './components/ArticleCards.vue';
import IdCard from './components/IdCard.vue';
import RefreshRight from './components/RefreshRight.vue';
import Announcement from './components/Announcement.vue';
import Analysis from './components/Analysis.vue';


export default defineComponent({
  name: 'Home',
  components: {
    ArticleCards,
    IdCard,
    RefreshRight,
    Announcement,
    Analysis,
  },
  setup() {
    const { t } = useI18n();
    const data = reactive({
      pagination: {
        size: 5,
        page: 1,
      },
      idCardValue:{
        article: 0,
        category: 0,
        tag: 0,
      },
      articleList: [] as ArticleCardVO[],
      loading: true,
      showFailed: false,
      announcement: t('message.null_announcement'),
      ann_user: '',
      ann_time: '',
      page: {
        total: 0 as number,
        currentPage: 1 as number,
        count: 0 as number,
      }
    });
    const handleArticles = (page?: number) => {
      data.loading = true;
      data.showFailed = false;
      if (page){
        data.pagination.page = page;
      }
      getArticlePage(data.pagination).then((res) => {
        data.articleList = res.list;
        data.page.total = res.total;
        data.page.currentPage = res.pageNum;
        data.page.count = res.pages;
        data.loading = false;
        data.showFailed = false;
      }).catch(() => {
        window.setTimeout(() =>{
          if(data.loading){
            data.showFailed = true;
            data.loading = false;
          }
        }, 3000);
      });
    };
    const handleHomeCard = () => {
      getMainInfo().then(res => {
        data.idCardValue = res;
      });
    };
    const handleAnnouncement = () => {
      getAnnouncement().then(res => {
        if(res.announcement){
          data.announcement = res.announcement;
          data.ann_user = res.user;
          data.ann_time = res.time;
        }
      });
    };
    const handleReload = () =>{
      handleArticles();
      handleHomeCard();
      handleAnnouncement();
    };
    onMounted(() => {
      handleReload();
    });
    return {
      data,
      handleArticles,
      handleReload,
    };
  }
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  .el-col {
    display: block;

  }
}
.home-banner {
  left: 0;
  right: 0;
  height: 100vh;
  background: #fff url("../../../assets/background/home.jpg") no-repeat fixed center center;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;

  .title {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    top: 300px;
    margin: auto;
    bottom: 0;
    color: #fff;
    font-size: 24px;
    font-weight: 500;
  }

  .titles {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    top: 350px;
    margin: auto;
    bottom: 0;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }
}

.home_main {
  max-width: 1100px;
  margin: 48px auto 28px;
  display: flex;
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
     .more{
       border-radius: 4px;
       box-shadow: 0 2px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
       background-color: #fff;
     }
     .active{
       box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
     }
    }
  }
  .btn-reload{
    margin: 5px;
  }
  .col-pd{
    .card-main{
      position: -webkit-sticky;
      position: sticky;
      top: 56px;
      .announcement-card{
        margin-top: 15px;
        animation-duration: 1s;
        animation-fill-mode: both;
      }
      .analysis-card{
        margin-top: 15px;
        margin-bottom: 20px;
        animation-duration: 1s;
        animation-fill-mode: both;
      }
    }
  }
}

</style>
