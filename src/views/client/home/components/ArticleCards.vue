<template>
  <div>
    <el-card
      v-for="(item, index) in articleList"
      :key="index"
      v-auto-animate
      class="card_main"
    >
      <div class="article-cover" :class="isRight(index)" @click="handleArticle(item.id)">
        <el-skeleton
          style="width: 100%"
          :loading="loading"
          animated
          :count="3"
        >
          <template #template>
            <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
            <div style="padding: 14px">
              <el-skeleton-item variant="h3" style="width: 100%" />
              <div class="empty_div" />
            </div>
          </template>
          <template #default>
            <el-image
              class="on-hover"
              fit="fill"
              :src="item.cover"
            />
          </template>
        </el-skeleton>
      </div>
      <div class="article-wrapper">
        <div>
          <router-link :to="'/article/'+ item.id" class="article-title">{{ item.title }}</router-link>
        </div>
        <div class="article-info">
          <el-icon><Calendar /></el-icon>
          &nbsp;{{ item.createTime }}
          <span class="separator">|</span>
          <SvgIcon name="type" :size="14" color="#0000008a" />
          &nbsp;{{ item.typeName }}
          <span v-if="item.tagVOList.length > 0" class="separator">|</span>
          <div
            v-for="( tag, i) in item.tagVOList"
            :key="i"
            class="article-tag"
          >
            <el-icon v-if="tagsExceeds(i)"><CollectionTag /></el-icon>
            <span v-if="tagsExceeds(i)">{{ tag.nameZh }}</span>
            &nbsp;
          </div>
          <div v-if="showMore(item.tagVOList.length)" class="article-tag">
            <span class="separator">|</span>
            <el-icon><More /></el-icon>
          </div>
        </div>
        <div class="article-context">
          {{ item.content }}
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, More, CollectionTag } from '@element-plus/icons-vue';
import { ArticleCardVO } from '@/api/model/client/home';
import { NullArray } from '@/constant/type';

export default defineComponent({
  name: 'ArticleCards',
  components: { Calendar, CollectionTag, More },
  props: {
    articleList: {
      type: Object as PropType<Array<ArticleCardVO>>,
      default: NullArray<ArticleCardVO>(),
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: true,
    }
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      loading: true,
      tagsLengths: 2,
    });
    const isRight = (index: number) => {
      return index % 2 == 0 ? 'left-radius' : 'right-radius';
    };
    const tagsExceeds = function(index: number){
      return index < data.tagsLengths;
    };
    const showMore = (index: number): boolean => {
      return index > data.tagsLengths;
    };
    const handleArticle = (id: number | string) => {
      router.push('/article/'+ id);
    };
    return {
      data,
      isRight,
      tagsExceeds,
      showMore,
      handleArticle,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-card{
  border-radius: 8px;
  margin-bottom: 20px;
}
.el-card:hover{
  box-shadow:0 4px 12px 12px rgba(7,17,27,.15)
}
.el-card {
  &:deep(.el-card__body) {
    padding: 0;
    display: flex;
    height: 250px;
    align-items: center;
  }
}
.card_main{
  padding: 0;
  .article-cover {
    overflow: hidden;
    height: 100%;
    display: flex;
    width: 45%;
    cursor: pointer;
    .empty_div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      height: 16px;
    }
    .on-hover{
      width: 100%;
      transition: all .6s;
    }
  }
  .article-wrapper{
    width: 50%;
    padding: 0 2.5rem;
    text-align: left;
    font-size: 14px;
    transition: all .3s;
    .article-context{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .article-title{
      text-decoration: none;
      color: #000;
    }
    .article-info{
      display: flex;
      align-items: center;
      padding: 7px 0;
      font-size: 12px;
      color: rgba(0,0,0,.54);
      .article-tag{
        display: flex;
        align-items: center;
      }
    }
  }
  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
  .article-wrapper a:hover {
    font-size: 1.5rem;
    transition: all 0.3s;
    color: #8e8cd8;
  }
}
.card_main:hover .on-hover{
  transform: scale(1.1);
}
.left-radius {
  border-radius: 8px 0 0 8px !important;
  order: 0;
}
.right-radius {
  border-radius: 0 8px 8px 0 !important;
  order: 1;
}
</style>
