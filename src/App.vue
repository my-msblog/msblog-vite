<template>
  <router-view class="root-view" />
</template>
<script setup lang="ts"></script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",
    Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,
    "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",
    "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.root-view{
  min-height: 650px;
}
</style>
