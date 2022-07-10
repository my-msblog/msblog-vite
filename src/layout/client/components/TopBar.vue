<template>
  <div class="ly_top">
    <div class="center_container">
      <div class="left_title">
        <router-link to="/home" class="title" :style="data.style">
          {{ $t(`bar.title`) }}
        </router-link>
      </div>
      <div class="menu-title">
        <div v-for="(item, index) in menuBarItem" :key="index">
          <router-link :to="item.route" class="text" :style="data.style">
            <span class="item-center">
              <ElIcons :name="item.icon" />
              {{ $t('bar.' + item.text) }}
            </span>
          </router-link>
        </div>
        <div>
          <router-link
            v-if="online()"
            to="/login"
            class="text"
            :style="data.style"
          >
            <span class="item-center"> 
              <ElIcons name="UserFilled" />
              {{ $t('bar.login') }}
            </span>
          </router-link>
          <el-dropdown
            v-else
            class="drop_down"
            @command="handleCommand"
          >
            <el-avatar :src="data.imgsrc" :size="23" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="changePwd">
                  {{ $t('bar.change_password') }}
                </el-dropdown-item>
                <el-dropdown-item command="pCenter">
                  {{ $t('bar.personal_center') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="isAdmin()" command="toAdmin">
                  {{ $t('bar.to_admin') }}
                </el-dropdown-item>
                <el-dropdown-item command="signOut">{{ $t('bar.sign_out') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <language
            class="change_text"
            style="text-shadow: rgba(0, 0, 0, 0.3) 0.05rem 0.05rem 0.1rem"
            :style="data.style"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { logout } from '@/api/sys';
import { ElMessage } from 'element-plus';
import { menuBarItem } from './data';

export default defineComponent({
  name: 'TopBar',
  components: {},
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      style: {},
      opacity: 0,
      iconColor: 'rgba(255, 255, 255,0.9)',
      imgsrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    });
    const handleWindowScroll = function () {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      data.opacity = Math.abs(Math.round(scrollTop)) / 250;
      if (data.opacity > 0.85) {
        data.opacity = 0.85;
      }
      if (data.opacity === 0) {
        data.opacity = 0.9;
        data.style = { color: `rgba(255, 255, 255,${data.opacity})` };
        data.iconColor = `rgba(255, 255, 255,${data.opacity})`;
        return;
      }
      data.iconColor = `rgba(50, 50, 50,${data.opacity})`;
      data.style = { color: `rgba(50, 50, 50,${data.opacity})` };
    };
    window.addEventListener('scroll', handleWindowScroll);
    const online = function () {
      const username = store.getters.getUsername;
      return username === '' || username === null;
    };
    const isAdmin = function (): boolean {
      const role = store.getters.getUserRole as string;
      return role !== '' && role !== 'undefined';
    };
    const handleCommand = async function (command: string) {
      switch (command) {
        case 'changePwd':
          console.log(command);
          break;
        case 'pCenter':
          await router.push('/userInfo');
          break;
        case 'signOut':
          await logout().then(() => {
            ElMessage.success({
              message: t('message.sign_out_success'),
              type: 'success',
              duration: 2 * 1000,
            });
          });
          await router.push('/login');
          store.commit('clearUser');
          break;
        case 'toAdmin':
          await router.push('/admin');
          break;
      }
    };
    return {
      handleWindowScroll,
      handleCommand,
      data,
      isAdmin,
      online,
      menuBarItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.ly_top {
  .center_container {
    width: 100%;
    height: 30px;
    
    .left_title {
      float: left;
      font-size: 18px;
      font-weight: bold;
      line-height: 30px;
      max-width: 434px;
    }

    .menu-title {
      height: 22px;
      display: flex;
      font-size: 14px;
      align-items: center;
      float: right;
      margin-right: 10px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Lato, Roboto,
        PingFang SC, Microsoft YaHei, sans-serif !important;
      .icon_h:hover {
        color: #49b1f5;
      }
    }
    .text {
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.9);
      margin-left: 10px;
      margin-right: 10px;
      font-size: 14px;
      
      .item-center {
        display: inline-flex;
        align-items: center;
      }
    }
    .title {
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 0.9);
      margin-top: 7px;
      margin: 0 10px;
      text-decoration: none;
    }
    .router-link-active {
      text-decoration: none;
    }
    .text:hover {
      color: #49b1f5 !important;
    }
    .router-link-active {
      text-decoration: none;
    }

    &:deep(.change_text) {
      margin: 0 10px;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3) !important;
    }
    .drop_down {
      margin: 0 10px;
    }
  }
}
</style>
