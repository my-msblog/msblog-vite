<template>
  <div class="gradient_body">
    <div class="bottom_text">
      Copyright ©2020-2021 by MS
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Footer',
  setup() {
    return {};
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
