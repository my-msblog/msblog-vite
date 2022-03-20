<template>
<div class="top">
  <TopBar style="font-color:black"/>
  </div>

<div class="bg">
      <p class="p404">404</p>
      <div class="frame">
        <div class="frame-glass"></div>
        <p class="p1">{{ t('message.no_find') }}</p>
        <button class="return_home" @click="backHome">{{ t('message.go_home') }}<span></span></button>
        <button class="return_home" @click="handleGoBack">{{ t('message.return') }}<span></span></button>
      </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import TopBar from '@/layout/client/components/TopBar.vue';
export default defineComponent({
  name: 'Page404', 
  components:{ TopBar},
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const handleGoBack = () =>{
      router.back();
    };
    const backHome=()=>{
      router.push('/home');
    }
    return {
      t,
      router,
      handleGoBack,
      backHome,
    };
  }
});
</script>
<style lang="scss" scoped>
// ::v-deep .text{
//   color:black !important; 
// }
  .top{
    width: 100%;
    height: 54px;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0;
  }
  .bg{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    background:url(/src/assets/background/404bg.jpg) no-repeat fixed center center;
        .p404{
          width: 100%;
          font-size:300px;
          margin: auto;
          color: white;
        }
        .frame{
          height: 250px;
          border-radius:40px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: 0 10px 20px rgb(0 0 0 / 50%);
          overflow: hidden;
          z-index: 1;
          position: relative;
          .frame-glass{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(5px);
            z-index: -1;
            margin: -30px;
            background-image: url(/src/assets/background/404bg.jpg);
            background-position: center top;
            background-size: cover;
            background-attachment: fixed;
          }
          .p1{
            font-size:30px;
            width: 100%;
            margin: auto;
            color: white;
          }
          .return_home{
            margin: auto;
            margin-top:35px;
            border:none;
            display:block;
            position: relative;
            padding:0.5em 2.2em;
            font-size:25px;
            background: transparent;
            cursor:pointer;
            user-select:none;
            color:white;
            overflow:hidden;
            z-index: 0;
            border-radius:30px;
          }
          .return_home span{
            position:absolute;
            left:0;
            top:0;
            width:95%;
            height:80%;
            background: transparent;
            z-index:-1;
            border:4px solid white;
            border-radius:30px;
          }
          .return_home span::before{
            content:"";
            position:absolute;
            width:8%;
            height:500%;
            // background: rgba(255, 255, 255, 0); box-shadow: 0px 0px 0px 0px;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%) rotate(-60deg);
            transition: all .3s;
          }
          .return_home:hover span::before,.return_home:focus span::before{
            transform:translate(-50%,-50%) rotate(-90deg);
            width:100%;
            background: linear-gradient(#845EC2,#2C73D2,#0081CF,#0089BA,#008E9B,#008F7A);
          }
          .return_home:hover,.return_home:focus{
            color:white;
          }
        }
  }
</style>