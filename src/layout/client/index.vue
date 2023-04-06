<template>
  <el-container class="container">
    <ul class="bg-bubbles">
      <li v-for="(index) in data.bubbles" :key="index" />
    </ul>
    <el-header class="c_header" :style="data.style">
      <TopBar class="header_main" />
    </el-header>
    <el-main class="c_main">
      <el-backtop :visibility-height="5" />
      <transition name="el-fade-in-linear" :duration="10000">
        <el-scrollbar>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-scrollbar>
      </transition>
    </el-main>
    <el-footer class="c_footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TopBar from './components/TopBar.vue';
import Footer from './components/Footer.vue';
export default defineComponent({
  name: 'ClientLayout',
  components: { TopBar, Footer },
  setup() {
    const data = reactive({
      style: {},
      opacity: 0,
      bubbles: 10,
    });
    const handleWindowScroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      data.opacity = Math.abs(Math.round(scrollTop)) / 250;
      if (data.opacity > 0.85) {
        data.opacity = 0.85;
      }
      if (data.opacity === 0) {
        data.style = { background: `rgba(255, 255, 255,${data.opacity})`, 'box-shadow': '0 0 0 0' };
        return;
      }
      data.style = { background: `rgba(255, 255, 255,${data.opacity})`, 'box-shadow': '0 5px 6px -5px hsl(0deg 0% 52% / 60%)' };
    };
    window.addEventListener('scroll', handleWindowScroll);
    return {
      handleWindowScroll,
      data
    };
  }
});
</script>

<style lang="scss">
.el-scrollbar{
  overflow: visible !important;
}
.el-scrollbar__wrap{
  overflow: visible !important;
}
.container{
  .c_header{
    background: rgba(255,255,255,0);
    width: 100%;
    height: 56px;
    position: fixed;
    z-index: 999;
    padding: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 0 ;
    .header_main{
      width: 100%;
    }
  }
  .c_main{
    min-height: calc(100vh - 100px);
    padding: 0;
    display: block !important;
    overflow: visible;
    text-align: center;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-origin: initial;
    background-clip: initial;
    background: linear-gradient(
        90deg,rgba(247,149,51,.1),rgba(243,112,85,.1) 15%,
        rgba(239,78,123,.1) 30%,rgba(161,102,171,.1) 44%,
        rgba(80,115,184,.1) 58%,rgba(16,152,173,.1) 72%,
        rgba(7,179,155,.1) 86%,rgba(109,186,130,.1));
  }
  .c_footer{
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    padding: 0;
  }
}
.bg-bubbles {
  position: fixed;
  top: 0;
  z-index: -1;
  padding: 0;
  left: 0;
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -100px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    background-color: rgba(247, 149, 51, 0.2);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 10%;
      background-color: rgba(189, 65, 100, 0.2);
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
      background-color: rgba(22, 95, 163, 0.2);
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
      background-color: rgba(129,8,13,.1);
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color:rgba(173, 101, 185, 0.1);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(19, 173, 197, 0.1);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
      background-color: rgba(21, 165, 153, 0.1);
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
      background-color: rgba(223, 213, 82, 0.2);
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(7, 179, 155, 0.2);
    }
    &:nth-child(10) {
      left: 85%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
      background-color: rgba(48, 54, 54, 0.2);
    }
  }

}
</style>
