<template>
  <div class="article-wapper" :style="wapperBackground">
    <div class="article-info">
      <div class="article-title">{{ data.article.title }}</div>
      <div class="article-info-main">
        <div class="frist-line item-center">
          <span class="item-center">
            <el-icon color="#fff">
              <Calendar />
            </el-icon>
            &nbsp;
            {{ data.article.createTime }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <el-icon>
              <Refresh />
            </el-icon>
            &nbsp;
            {{ data.article.updateTime }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <el-icon>
              <CopyDocument />
            </el-icon>
            &nbsp;
            {{ data.article.typeName }}
          </span>
        </div>
        <div class="second-line content-center">
          <span v-for="(item, index) in data.article.tags" :key="index" class="item-center">
            <SvgIcon name="tag" :size="12" color="#fff" />
            &nbsp;
            {{ item.nameZh }}
            <span v-if="index !== data.article.tags.length -1" class="separator">|</span>
          </span>
        </div>
        <div class="third-line">
          <span></span>
        </div>
      </div>
    </div>
  </div>
  <div class="article-container"></div>
</template>

<script lang="ts">
import { 
  defineComponent,
  onMounted, 
  reactive,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, Refresh, CopyDocument } from '@element-plus/icons-vue';
import { getArticle } from '@/api/client/article';
import { IData, IArticle } from './data';
export default defineComponent({
  name: 'Article',
  components: { Calendar, Refresh,CopyDocument },
  setup() {
    const router = useRouter();
    const articleId = Number(router.currentRoute.value.params.id);
    const data = reactive<IData>({
        commentList: [],
        article: {
          cover: '../src/assets/background/archive.jpg',
          title: '文章标题',
          typeName: '类别',
          tags: [
            {
              name: 'aaa',
              nameZh: 'aaa',
            },
            {
              name: 'aaa',
              nameZh: 'aaa',
            },
          ],
          createTime: new Date().toLocaleDateString(),
          updateTime: new Date().toLocaleDateString(),
        } as IArticle,
    });
    const handleArticle = () =>{
        getArticle({id: articleId}).then(res => {
          
        });
    };
    const wapperBackground = computed(() => {
        return 'background: url(' + data.article.cover +') center center / cover no-repeat';
    });

    onMounted(() => {
      document.title = data.article.title ? data.article.title : document.title;
    });
    return {
      data,
      wapperBackground,
    };
  }
});
</script>

<style lang="scss" scoped>
.article-wapper{
  color: aliceblue;
  height: 350px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: header-effect 1s;
  .article-info{
    .article-title{
      font-size: 35px;
      margin: 20px 0 8px;
    }
    .article-info-main{
      font-size: 14px;
      .frist-line{
        font-size: 90%;
      }
      .second-line{
        font-size: 90%;
      }
      .third-line{
        font-size: 90%;
      }
    }
  }
}
.article-container{
  animation: main 1s;
  max-width: 1100px;
  margin: 48px auto 28px;
  display: flex;
}
</style>
