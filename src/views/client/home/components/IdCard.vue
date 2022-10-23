<template>
  <el-card>
    <div class="wapper">
      <el-avatar
        shape="square"
        :size="70"
        style="background-color: white"
        src="src/assets/icon2.png"
      />
      <div class="wapper-name">MS</div>
      <div class="wapper-motto">这个人很懒，什么都没有留下</div>
      <div class="blog-info">
        <div v-for="(item, index) in data.infoList" :key="index" class="blog-info-item">
          <div class="blog-info-item-title">{{ t('pages.'+item.title) }}</div>
          <div class="blog-info-item-value">{{ item.value }}</div>
        </div>
      </div>
      <el-button
        class="btn-add"
        type="success"
        size="default"
        plain
        round
        @click="handleClickLabel"
      >
        {{ $t('button.add_to_tag') }}
      </el-button>
      <div class="icon-list">
        <SvgIcon
          name="qq-circle"
          size="28"
          class="svg-icon current"
          @click="handleQQ"
        />
        <SvgIcon
          name="github"
          size="28"
          class="svg-icon current"
          @click="handleGitHub"
        />
        <SvgIcon
          name="gitee"
          size="28"
          class="svg-icon current"
          @click="handleGitee"
        />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { NullData } from '@/constant/type';

export default defineComponent({
  name: 'IdCard',
  components: {},
  props: {
    article: {
      type: Number as PropType<number>,
      default: NullData<number>(0),
    },
    category: {
      type: Number as PropType<number>,
      default: NullData<number>(0),
    },
    tags: {
      type: Number as PropType<number>,
      default: NullData<number>(0),
    }
  },
  setup(props) {
    const { t } = useI18n();
    const data = reactive({
      infoList: {
        article: {
          title: 'article',
          value: 0,
        },
        category: {
          title: 'category',
          value: 0,
        },
        tags: {
          title: 'tags',
          value: 0,
        },
      }
    });
    const handleClickLabel = function(){
      ElMessage.warning({
        message: t('message.add_to_label'),
      });
    };
    const handleGitHub =() =>{
      window.open('https://github.com/maosheng5478', '_blank');
    };
    const handleGitee =() =>{
      window.open('https://gitee.com/honghao5478', '_blank');
    };
    const handleQQ =() =>{
      // window.open('https:www.baidu.com', '_blank');
      ElMessage({
        showClose: true,
        message: '如有需要请+QQ：361193645',
      });
    };
    watchEffect(() => {
      const watchProp = props;
      data.infoList.article.value = watchProp.article;
      data.infoList.category.value = watchProp.category;
      data.infoList.tags.value = watchProp.tags;
    });
    return {
      t,
      data,
      handleClickLabel,
      handleQQ,
      handleGitHub,
      handleGitee,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "src/styles/el-card.scss";
.wapper{
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,
  Helvetica Neue,Lato,Roboto,PingFang SC,Microsoft YaHei,sans-serif!important;
  .wapper-name{
    font-size: 1.375rem;
    margin-top: 7px;
  }
  .wapper-motto{
    font-size: 0.75rem;
    margin: 7px 0;
  }
  .blog-info{
    display: flex;
    justify-self: center;
    .blog-info-item{
      flex: 1;
      text-align: center;
      font-size: 0.875rem;
      .blog-info-item-title{
        padding: 10px;
        font-weight: 500 ;
      }
      .blog-info-item-value{
        font-size: 1.25rem;
      }
    }
  }
  .btn-add{
    width: 100%;
    height: 25px !important;
    margin: 15px 7px 0;
    padding: 3px;
    border-color: #67c23a;
  }
  .icon-list{
    margin: 15px 0 0;
    display:flex;
    flex-direction:row;
    .svg-icon{
      margin: auto;
      flex: 1;
    }
  }
}
</style>
