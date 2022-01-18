<template>
  <div>
    <div class="a_banner">
      <p class="a_title">{{ $t('bar.about') }}</p>
    </div>
    <FlowCard class="link-main">
      <Comments /> 
    </FlowCard>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Comments from '../article/components/Comments.vue';
export default defineComponent({
  name: 'About',
  components: { Comments },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.a_banner{
  height: 350px;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
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
.link-main{
  margin: 48px 200px 68px 200px;
  padding: 15px 10px 10px !important;
  display: flex;
  justify-content: center;
}
</style>
