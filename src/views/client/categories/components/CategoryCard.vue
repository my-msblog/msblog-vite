<template>
  <div class="item-card">
    <FlowCard>
      <div class="article-item-cover">
        <router-link :to="'/article/' + item.id">
          <el-skeleton
            style="width: 100%"
            :loading="loading"
            animated
          >
            <template #template>
              <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
              <div>
                <el-skeleton-item variant="p" style="width: 100%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                  "
                />
              </div>
            </template>
            <template #default>
              <el-image class="on-hover" fit="fill" :src="item.cover" />
            </template>
          </el-skeleton>
        </router-link>
      </div>
      <div class="article-item-info">
        <div class="info-title">
          <el-link
            :href="'/articles/' + item.id"
            :underline="false"
            style="font-size: 16px"
          >
            {{ item.title }}
          </el-link>
        </div>
        <div class="for-msg">
          <SvgIcon
            name="clock"
            size="15"
            color="rgba(0,0,0,.54)"
          />
          {{ item.createTime }}
          <div class="info-tag">
            <SvgIcon
              name="tag"
              size="15"
              color="rgba(0,0,0,.54)"
            />
            &nbsp;{{ item.typeName }}
          </div>
        </div>
      </div>
      <el-divider style="margin: 1px" />
      <div class="article-item-tags">
        <div v-for="(tag, index) in item.tagVOList" :key="index" class="article-item-tag">
          <el-link :underline="false" :href="'/tags/'+tag.tagId">{{ tag.name }}</el-link>
        </div>
      </div>
    </FlowCard>
  </div>
</template>
<script lang="ts">
import { ArticleCategoryVO } from '@/api/model/client/category';
import { NullObject } from '@/constant/type';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'CategoryCard',
  props: {
    item: {
      type: Object as PropType<ArticleCategoryVO>,
      default: NullObject<ArticleCategoryVO>(),
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: true,
    }
  },
  setup() {

  },
});
</script>

<style lang="scss" scoped>
.item-card{
  .el-card{
    padding: 0 !important;
    &:deep(.el-card__body){
      padding: 0 !important;
    }
  }
  .article-item-cover{
    height: 190px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    overflow: hidden;
     .on-hover{
       width: 100%;
       height:100%;
       transition: all .6s;
     }
  }
  .article-item-info{
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
    font-size: 15px;
    .info-title{
      text-align: left;
    }
    .for-msg{
      text-align: left;
      font-size: 14px;
      color: rgba(0,0,0,.54);
      .info-tag{
        display: flex;
        float: right;
        align-items: center;
        font-weight: bold;
      }
    }
  }
  .article-item-tags{
    padding: 10px 15px 10px 18px;
    text-align: left;
    .article-item-tag{
      display: inline-block;
      font-size: 0.725rem;
      line-height: 22px;
      height: 22px;
      border-radius: 10px;
      padding: 0 12px !important;
      /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      background: linear-gradient(to right, #f8ffae,#bdfff3);
      opacity: 0.6;
      margin-right: 0.5rem;
      .el-link.el-link--default{
        color: #000;
      }
      .el-link.el-link--default:hover{
        color: #000;
      }
    }
  }

}
.item-card:hover .on-hover{
  transform: scale(1.1);
}
</style>
