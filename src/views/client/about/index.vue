<template>
  <div>
    <div class="a_banner">
      <p class="a_title">{{ $t('bar.about') }}</p>
    </div>
    <FlowCard class="about-card">
      <el-avatar
        :size="70"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <div class="introduce item-center">
        <ElIcons name="Avatar" class="icon"/>
        <span>个人简介</span>
      </div>
      <p class="desc">
        感谢关注！
      </p>
    </FlowCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'About',
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.a_banner{
  left: 0;
  right: 0;
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background: #fff url('../../../assets/background/street.jpg') no-repeat center/100%;
  .a_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 200px;
    font-size: 24px;
    font-weight: bold;
  }
}
.about-card{
  text-align: center;
  margin: 48px auto 58px;
  padding: 15px 10px 10px !important;
  .introduce{
    height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 15px;
    .icon{
      margin: 0 5px;
    }
    span{
      font-weight: 600;
    }
  }
  .desc{
    text-align: left;
    font-size: .875em;
  }
}
</style>
