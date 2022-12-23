<template>
  <div class="gradient_body">
    <div class="bottom_text">
      {{ copyright }}<br />
      <div style="line-height:20px;display:inline-block;">
        <a 
          target="_blank" 
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35010202001614" 
          style="text-decoration:none;"
        >
          <img :src="getImageUrl('baian.png')" style="float:left;" />
          <p style="float:left;height:20px;margin: 0px 10px 0px 5px;">闽公网安备 35010202001614号</p>
        </a>
        <a
          target="_blank" 
          :href="icp_url" 
          style="text-decoration:none;"
        >{{ icp_code }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import webInfo from '@/constant/web-info';
import { getImageUrl } from '@/utils';

export default defineComponent({
  name: 'Footer',
  setup() {
    return {
      ...webInfo,
      getImageUrl
    };
  }
});
</script>

<style lang="scss" scoped>
.gradient_body {
  line-height: 2;
  padding: 35px 20px;
  color: #eee;
  bottom: 0;
  font-size: 14px;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
}

.bottom_text{
  font-size: 13px;
  text-decoration: none;
  text-align: center;
  margin-top: auto;
}

@keyframes baginmation {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
