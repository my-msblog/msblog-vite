<template>
  <div>
    <div class="a_banner">
      <p class="a_title">{{ $t('bar.about') }}</p>
    </div>
    <div class="page">
      <FlowCard class="link-main">
        <div class="link-title item-center">
          <SvgIcon name="windmill" class="mr5" />
          {{ $t('pages.link_title') }}
        </div>
        <div class="flink">
          <div class="flink-list">
            <div v-for="(item, index) in data.linkList" :key="index" class="flink-list-item">
              <a
                href="https://crazywong.com/"
                rel="external nofollow noreferrer"
                title="MYW"
                target="_blank"
              >
                <div class="flink-item-icon">
                  <img 
                    class="no-lightbox entered loaded" 
                    :src="item.url" 
                    alt="MYW"
                  >
                </div>
                <div class="flink-item-name">{{ item.name }}</div>
                <div class="flink-item-desc" :title="item.desc">{{ item.desc }}</div>
              </a>
            </div>
          </div>
        </div>
        <!-- <Comments /> -->
      </FlowCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import Comments from '../article/components/Comments.vue';
import { ILink, mock } from './data';
interface IData {
  linkList: Array<ILink>;
}
export default defineComponent({
  name: 'About',
  components: { },
  setup() {
    const data = reactive<IData>({
      linkList: [],
    });
    onMounted(() => {
      //data.linkList = mock;
    });
    return {
      data,
    };
  }
});
</script>

<style lang="scss" scoped>
.a_banner{
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background-size: cover !important;
  background: #fff url('@/assets/background/links.jpeg') no-repeat center/100%;
  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 24px;
    font-weight: bold;
  }
}
.page{
  display: flex;
  justify-content: center;
  .link-main{
    margin: 48px 0 68px 0;
    padding: 15px 10px 10px !important;
    width: 800px;
    &:deep(.el-card__body){
      flex: auto;
    }
    .link-title{
      text-align: left;
      font-size: 21px;
      color: #344c67;
      font-weight: 700;
      height: 28px;
      line-height: 28px;
    }
  }

  .flink {
    // margin-bottom: 20px;
    .flink-item-name, .flink-item-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .flink-list {
      overflow: auto;
      padding: 10px 10px 0;
      text-align: center;
      position: relative;

      > .flink-list-item {
        position: relative;
        float: left;
        overflow: hidden;
        margin: 10px 7px;
        width: calc(100% / 3 - 15px);
        height: 80px;
        border-radius: 8px;
        line-height: 17px;
        -webkit-transform: translateZ(0);

        &:hover .flink-item-icon {
          margin-left: -10px;
          width: 0;
        }
        &:before {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          background: rgba(73,177,245,0.7);;
          content: '';
          transition: transform .3s ease-out;
          transform: scale(0);
        }
        &:hover:before, &:focus:before, &:active:before {
          transform: scale(1);
        }
        a {
          color: #4c4948;
          text-decoration: none;
          .flink-item-icon {
            float: left;
            overflow: hidden;
            margin: 15px 10px;
            width: 55px;
            height: 55px;
            border-radius: 35px;
            transition: width .3s ease-out;
            img {
              width: 100%;
              height: 100%;
              transition: filter 375ms ease-in .2s,transform .3s;
              object-fit: cover;
            }
          }
        
        }
      }
    }

    .flink-item-name {
      padding: 16px 10px 0 0;
      font-weight: bold;
      font-size: 1.25em;
      height: 35px;
      box-sizing: border-box;
    }

    .flink-item-desc {
      padding: 16px 10px 16px 0;
      font-size: .9em;
      height: 45px;
      box-sizing: border-box;
    }

    .flink-name {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
}
</style>
