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
    <el-row :gutter="12">
      <el-col 
        :xl="19"
        :md="19"
        :sm="24"
        :xs="24"
      >
        <FlowCard class="md-card">
          <Viewer 
            class="md-view" 
            :text="data.article.contextMd" 
            ref="viewerRef"
            @load-title="loadTitle"
          />
          <el-descriptions 
            class="copyright"
            :column="1"
            >
            <el-descriptions-item :label="$t('pages.article_writer')">{{ data.article.writer }}</el-descriptions-item>
            <el-descriptions-item :label="$t('pages.article_link')">{{ data.article.writer }}</el-descriptions-item>
            <el-descriptions-item :label="$t('pages.copyright_claims')">
              {{ $t('message.claims_msg_one') }}
              <el-link/>
            </el-descriptions-item>
          </el-descriptions>
          <hr class="dashed-hr"/>
          <Comments class="comment" />
        </FlowCard>
      </el-col>
      <el-col 
        :xs="0"
        :md="5"
        :xl="5"
        hidden-md-and-down
      >
        <div class="affix-item">
          <FlowCard class="noun-card">
            <div class="item-center mb5">
              <ElIcons name="List" :size="18" style="font-size: 18px"/>
              {{ $t('pages.dir') }}
            </div>
            <div
              v-for="(anchor, index) in data.nouns"
              :key="index"
              :style="{ padding: `7px 0 7px ${anchor.indent * 20}px` }"
              class="noun-title"
              @click="handleAnchorClick(anchor)"
            >
              <a class="a-title" style="cursor: pointer">{{ anchor.title }}</a>
            </div>
          </FlowCard>
          <FlowCard class="recommend-card">

          </FlowCard>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
  ref,
  onMounted, 
  reactive,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, Refresh, CopyDocument } from '@element-plus/icons-vue';
import { getArticle } from '@/api/client/article';
import Comments from './components/Comments.vue';
import { IData, data as aData, TitleElement, } from './data';
export default defineComponent({
  name: 'Article',
  components: { Calendar, Refresh, CopyDocument, Comments },
  setup() {
    const router = useRouter();
    const articleId = Number(router.currentRoute.value.params.id);
    const viewerRef = ref();
    const data = reactive<IData>({
        commentList: [],
        article: aData, 
        nouns: [],
    });
    const handleArticle = () =>{
      getArticle({id: articleId}).then(res => { 
      });
    };
    const wapperBackground = computed(() => {
      return 'background: url(' + data.article.cover +') center center / cover no-repeat';
    });
    const loadTitle = (titles: TitleElement[]) => {
      data.nouns = titles;
    };
    const handleAnchorClick = (params: TitleElement) => {
        viewerRef.value.handleAnchorClick(params);
    };
    onMounted(() => {
      document.title = data.article.title ? data.article.title : document.title;
    });
    return {
      data,
      wapperBackground,
      viewerRef,
      loadTitle,
      handleAnchorClick,
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
  .md-card{
    text-align: left;
    .comment{
      margin-top: 20px;
      padding: 10px;
    }
    .copyright{
      border: 1px solid #eee;
      padding: 0.625rem 1rem;
    }
  }
  .noun-card{
    text-align: left;
    
    .noun-title{
      .a-title{
        margin-left: 1em;
      }
    }
    .noun-title:hover{
      background:#00c4b6;
      color: white;
    }
  }
  .recommend-card{
    margin-top: 10px;
  }
}
.el-card{
  overflow: auto;
  &:deep(.el-card__body){
  padding: 10px;
}
}

</style>
