<template>
  <div class="article-wapper" :style="wapperBackground">
    <div class="article-info">
      <div class="article-title">{{ data.article.title }}</div>
      <div class="article-info-main">
        <div class="frist-line all-center">
          <span class="item-center">
            <el-icon color="#fff">
              <Calendar />
            </el-icon>
            &nbsp;
            {{ $t('pages.publish_time') + ': ' + data.article.createTime }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <el-icon>
              <Refresh />
            </el-icon>
            &nbsp;
            {{ $t('pages.update_time') + ': ' + data.article.updateTime }}
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
          <span class="item-center">
            <SvgIcon name="word_count" :size="14" color="#fff" />
            &nbsp;
            {{ $t('pages.word_count') + ': ' + data.article.context.length }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <SvgIcon name="comment_line" :size="14" color="#fff" />
            &nbsp;
            {{ $t('pages.comment_count') + ': ' + data.article.likes }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <SvgIcon name="read" :size="14" color="#fff" />
            &nbsp;
            {{ $t('pages.read_count') + ': ' + data.article.read }}
          </span>
          <span class="separator">|</span>
          <span class="item-center">
            <SvgIcon name="comment_line" :size="14" color="#fff" />
            &nbsp;
            {{ $t('pages.comment_count') + ': ' + data.article.writer }}
          </span>
        </div>
        <div class="third-line content-center">
          <span v-for="(item, index) in data.article.tags" :key="index" class="item-center">
            <SvgIcon name="tag" :size="14" color="#fff" />
            &nbsp;
            {{ item.nameZh }}
            <span v-if="index !== data.article.tags.length -1" class="separator">|</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="article-container">
    <el-row :gutter="10">
      <el-col 
        :xl="18"
        :md="18"
        :sm="24"
        :xs="24"
      >
        <FlowCard>
          <MarkDown 
            placeholder="这是占位文本"
          />
          <Viewer />
        </FlowCard>
      </el-col>
      <el-col 
        :xs="0"
        :md="6"
        :xl="6"
        hidden-md-and-down
      >
        <FlowCard>dasdas</FlowCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
  onMounted, 
  ref,
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
          writer: 'ms',
          typeName: '类别',
          likes: 12,
          read: 200,
          context: '23123123123123123123',
          contextMd: '# hello',
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
.el-row{
  height: auto;
  width: 100%;
}
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
      font-size: 12px;
      .frist-line{
       padding: 5px 0;
      }
      .second-line{
        padding: auto;
        
      }
      .third-line{
        padding: 5px 0;
        
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
