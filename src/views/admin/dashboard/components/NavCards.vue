<template>
  <el-row :gutter="20">
    <el-col
      v-for="(item, index) in data.growCardList"
      :key="index"
      :xs="12"
      :sm="12"
      :lg="6"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <div class="card-title">
              <span>{{ item.title }}</span>
            </div>
            <el-tag size="small" :type="item.color">{{ item.action }}</el-tag>
          </div>
        </template>
        <div class="p-4 div-flex justify-between">
          <span class="s-text">${{ item.value }}</span>
          <SvgIcon :name="item.icon" :size="35" />
        </div>
        <div class="p-2 div-flex justify-between">
          <span>总{{ item.title }}</span>
          <span>{{ item.total }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  watchEffect, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { GrowCardItem, CardValue } from './data';
import { NullData } from '@/constant/type';
const defaultCardValue: CardValue = {
  visit: 0,
  user: 0,
  articles: 0,
  comments: 0,
};
export default defineComponent({
  name: 'NavCards',
  props: {
    value: {
      type: Object as PropType<CardValue>,
      default: NullData<CardValue>(defaultCardValue)
    },
    total: {
      type: Object as PropType<CardValue>,
      default: NullData<CardValue>(defaultCardValue)
    }
  },
  setup(props) {
    const { t } = useI18n();
    const data = reactive({
      growCardList: [
        {
          title: t('pages.visit_num'),
          icon: 'visit',
          value: props.value.visit,
          total: props.total.visit,
          color: '',
          action: t('constants.month'),
        },
        {
          title: t('pages.articles_num'),
          icon: 'articles',
          value: props.value?.articles,
          total: props.total?.articles,
          color: 'warning',
          action: t('constants.week'),
        },
        {
          title: t('pages.comments_num'),
          icon: 'comment',
          value: props.value?.comments,
          total: props.total?.comments,
          color: 'danger',
          action: t('constants.week'),
        },
        {
          title: t('pages.user_num'),
          icon: 'user',
          value: props.value?.user,
          total: props.total?.user,
          color: 'success',
          action: t('constants.all'),
        },
      ] as GrowCardItem[],
    });
    watchEffect(()=>{
      const propContent = props.value;
      data.growCardList[0].value = propContent?.visit;
      data.growCardList[1].value = propContent?.articles;
      data.growCardList[2].value = propContent?.comments;
      data.growCardList[3].value = propContent?.user;
      const propTotal = props.total;
      data.growCardList[0].total = propTotal?.visit;
      data.growCardList[1].total = propTotal?.articles;
      data.growCardList[2].total = propTotal?.comments;
      data.growCardList[3].total = propTotal?.user;
    });
    return {
      data,
      props,
    };
  },
});
</script>

<style lang="scss">
.el-row{
  height: auto;
}
.el-card{
  font-size: 13px;
  .el-card__header{
    padding: 0 12px;
  }
  .el-card__body{
    padding: 12px;
  }
}
.card-header {
  display: flex;
  align-items: center;

  .card-title{
    display: inline-block;
    flex: 1;
    padding: 8px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.p-4{
  padding: 0.7rem;
  .s-text{
    font-size: 1.5rem;
    line-height: 2.1rem;
  }
}
.p-2{
  padding: 0.5rem;
}
.justify-between {
  justify-content: space-between;
}
.div-flex{
  display: flex;
}
</style>
