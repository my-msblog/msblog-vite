<template>
  <div>
    <div class="left_logo">
      <img src="@/assets/icon2.png" class="icon_logo" alt="">
      <div class="logo_text">{{ $t('bar.title') }}</div>
    </div>
    <div class="ah_right">
      <el-tooltip
        :content="$t('message.blog_home')"
        placement="bottom-start"
        style="width: 1.3em; height: 1.3em;"
      >
        <div @click="backHome">
          <ElIcons name="Monitor" />
        </div>
      </el-tooltip>
      <Language class="ah_change" />
      <div>
        <el-dropdown style="" @command="handleCommand">
          <el-avatar icon="el-icon-user-solid" size="small" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="pwd_change">{{ $t('message.change_password') }}</el-dropdown-item>
              <el-dropdown-item command="logout">{{ $t('message.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { logout } from '@/api/sys';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { openFullScreen } from '@/hooks/useLoading';

export default defineComponent({
  name: 'AdminHeader',
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const handleCommand = async function (command: string) {
      switch (command) {
        case 'pwd_change':
          break;
        case 'logout':
          await logout().then(() => {
            store.commit('clearUser');
            ElMessage({
              message: t('message.successful_logout'),
              type: 'success',
              duration: 2 * 1000,
            });
          }).catch((err) => {
            console.error(err);
          });
          openFullScreen(t('being_exited'), goHome);
          break;
        default:
          break;
      }
    };
    const backHome = () => {
      router.push('/home');
    };
    const goHome = () => {
      backHome();
      store.commit('clearUser');
    };
    return {
      handleCommand,
      backHome,
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/styles/constant.scss';
.el-row{
  display:flex;
  flex-wrap: wrap;
  height: #{$admin_header_height};
}

.ah_right{
  display: flex;
  float: right;
  margin-right: 15px;
  align-items: center;
  height:#{$admin_header_height};
  .ah_change{
    color: #000 !important;
    margin: 5px;
  }
}


.left_logo{
  float: left;
  text-align: center;
  align-items: center;
  height: #{$admin_header_height};
  display: flex;
  .icon_logo{
    width: 40px;
    margin-left: 20px;
    /*line-height: $admin_header_height;*/
  }
  .logo_text{
    margin-left: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
    color: rgba(0,0,0,0.9);
  }
}
.text{
  // font-weight: bold;
  // font-size: 18px;
  width: 245px;
  text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  color: rgba(0,0,0,0.9);
  text-decoration: none;
  text-align: center;
  margin-top: auto;
}
</style>
