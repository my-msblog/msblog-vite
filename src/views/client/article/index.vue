<template>
  <div v-loading="loading">
    <div class="article-wapper" :style="wapperBackground">
      <div class="article-info">
        <div class="article-title">{{ data.article.title }}</div>
        <div class="article-info-main">
          <div class="first-line all-center">
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
              {{ $t('pages.word_count') + ': ' + data.article.content.length }}
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
              {{ $t('pages.read_count') + ': ' + data.article.reading }}
            </span>
            <span class="separator">|</span>
            <span class="item-center">
              <SvgIcon name="comment_line" :size="14" color="#fff" />
            &nbsp;
              {{ $t('pages.writer') + ': ' + data.article.writer }}
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
          :xs="24"
          :sm="19"
        >
          <FlowCard class="md-card">
            <Viewer
              v-if="data.article.contentMd.length > 0"
              ref="viewerRef"
              class="md-view"
              :text="data.article.contentMd"
              @load-title="loadTitle"
            />
            <el-descriptions
              class="copyright"
              :column="1"
            >
              <el-descriptions-item label-class-name="lable" :label="$t('pages.article_writer') + '：'">
                {{ data.article.writer }}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="lable" :label="$t('pages.article_link') + '：'">
                <el-link
                  type="info"
                  :href="articleUrl"
                  target="_blank"
                >
                  {{ articleUrl }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label-class-name="lable" :label="$t('pages.copyright_claims') + '：'">
                {{ $t('message.claims_msg_one') }}
                <el-link
                  type="info"
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                >
                  CC BY-NC-SA 4.0
                </el-link>
                {{ $t('message.claims_msg_two') }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="article-bottom content-center">
              <el-button type="info" @click="handleArticleLike">{{ $t('button.like')+ '  ' + data.like }}</el-button>
              <el-button
                type="primary"
                style="margin-left: 30px;"
              >
                {{ $t('button.reward') }}
              </el-button>
            </div>
            <hr class="dashed-hr" />
            <Comments :id="parseInt(articleId)" class="comment" />
          </FlowCard>
        </el-col>
        <el-col
          :xs="0"
          :sm="5"
          hidden-sm-and-down
        >
          <div class="affix-item">
            <FlowCard class="noun-card">
              <div class="item-center mb5">
                <ElIcons
                  name="List"
                  :size="18"
                  style="font-size: 18px"
                  class="mr5"
                />
                {{ $t('pages.dir') }}
              </div>
              <div
                v-for="(anchor, index) in data.nouns"
                :key="index"
                :style="{ padding: `7px 0 7px ${anchor.indent * 10}px` }"
                class="noun-title"
                @click="handleAnchorClick(anchor)"
              >
                <a class="a-title" style="cursor: pointer">{{ anchor.title }}</a>
              </div>
            </FlowCard>
            <FlowCard class="recommend-card">
              <div class="item-center mb5">
                <ElIcons name="MagicStick" :size="18" class="mr5" />
                {{ $t('pages.recommend') }}
              </div>
              <div
                v-for="(item) in data.recommendList"
                :key="(item.id as any)"
                class="recommend"
                @click="handleClickRecommend(item.id)"
              >
                <el-row>
                  <el-col :span="8">
                    <el-image :src="item.cover" fit="cover" />
                  </el-col>
                  <el-col :span="16">
                    <div class="recommend-text item-center">
                      <div>
                        <div>{{ item.title }}</div>
                        <div class="rec-time mt5">{{ item.createTime }}</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </FlowCard>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  computed,
watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, Refresh, CopyDocument } from '@element-plus/icons-vue';
import { getArticle, getRecomend } from '@/api/client/article';
import Comments from './components/Comments.vue';
import { IData, data as aData, TitleElement, } from './data';
export default defineComponent({
  name: 'Article',
  components: { Calendar, Refresh, CopyDocument, Comments },
  setup() {
    const router = useRouter();
    const articleId = computed<string>(() => router.currentRoute.value.params.id as unknown as string);
    const viewerRef = ref();
    const loading = ref(false);
    const data = reactive<IData>({
        commentList: [],
        article: aData,
        nouns: [],
        like: 15,
        recommendList: [],
    });
    const wapperBackground = computed(() => 'background: url(' + data.article.cover +') center center / cover no-repeat');
    const articleUrl = computed(()=> import.meta.env.VITE_APP_PUBLIC_PATH + router.currentRoute.value.fullPath);
    const handleArticle = () =>{
      loading.value = true;
      getArticle({ id: articleId.value }).then(res => {
        data.article = res as any;
      }).finally(() => loading.value = false);
    };
    const loadTitle = (titles: TitleElement[]) => {
      data.nouns = titles;
    };
    const handleAnchorClick = (params: TitleElement) => {
        viewerRef.value.handleAnchorClick(params);
    };
    const handleRecommend = () => {
      getRecomend().then((res) => {
        data.recommendList = res;
      });
    };
    const handleClickRecommend = (id: IdType) => {
      router.push(`/article/${id}`).then(() => {
        // handleArticle();
        // handleRecommend();
        // document.title = data.article.title ? data.article.title : document.title;
      });
    };
    const handleArticleLike = () => {

    };
    onMounted(() => {
      handleArticle();
      handleRecommend();
      document.title = data.article.title ? data.article.title : document.title;
    });
    watch(
      articleId,
      () =>  {
        if (articleId.value === undefined) {
          return;
        }
        handleArticle();
        handleRecommend();
        document.title = data.article.title ? data.article.title : document.title;
      }
    );
    return {
      data,
      articleId,
      wapperBackground,
      viewerRef,
      loadTitle,
      handleAnchorClick,
      articleUrl,
      handleClickRecommend,
      handleArticleLike,
      loading,
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
      .first-line{
       padding: 5px 0;
      }
      .second-line{
        padding: 1px;
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
      &:deep(.el-descriptions__label:not(.is-bordered-label)){
        margin-right: 0;
      }
      &:deep(.lable){
        color: #49b1f5;
        font-weight: 700;
      }
    }
    .article-bottom{
      margin: 15px 0;
    }
  }
  .noun-card{
    text-align: left;

    .noun-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .recommend{
      cursor: pointer;
      display: flex;
      padding: 6px 0;
      text-align: left;
      .recommend-text{
        margin-left: 6px;
        font-size: 12px;

        .rec-time{
          color: #858585;
          font-size: 85%;
        }
      }
    }
  }
}
.el-card{
  overflow: auto;
  &:deep(.el-card__body){
  padding: 10px;
  }
}

</style>
