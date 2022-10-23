<template>
  <div style="overflow: hidden">
    <div id="paper">
      <el-form
        class="login-container"
        label-position="left"
        label-width="0px"
        :rules="data.rules"
      >
        <div style="width: 100%">
          <h3 class="login_title">{{ $t('bar.title') }}</h3>
        </div>
        <el-form-item>
          <el-input
            v-model="data.form.username"
            type="text"
            autocomplete="off"
            :placeholder="$t('pages.account')"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="data.form.password"
            :type="data.pwd_type"
            autocomplete="off"
            :placeholder="$t('pages.password')"
          >
            <template #suffix>
              <SvgIcon
                :name="data.visible"
                color="#939393"
                size="28"
                @click="handleVisible()"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row justify="space-between" class="fill-w">
            <el-col :span="14">
              <el-input
                v-model="data.form.code"
                size="large"
                :placeholder="$t('pages.verificationCode')"
                @keyup.enter="handleLogin"
              />
            </el-col>
            <el-col :span="10" class="current">
              <el-image
                v-if="data.imgSrc"
                v-loading="data.loading"
                :src="data.imgSrc"
                style="height: 40px"
                @click="handleArithmetic"
              ></el-image>
              <div
                v-else
                v-loading="data.loading"
                class="code-div all-center"
                @click="handleArithmetic"
              >
                <ElIcons name="PictureFilled" color="#409EFC" :size="30" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row justify="space-between" class="fill-w">
            <el-col :span="11">
              <el-button
                :loading="data.spinner"
                type="primary"
                class="btn_bg"
                @click="handleLogin"
              >
                {{ $t('pages.login') }}
              </el-button>
            </el-col>
            <el-col :span="11">
              <el-button type="primary" class="btn_bg" @click="toRegister">
                {{ $t('pages.register') }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <router-link to="/home" style="text-decoration: none;" class="fill-w">
            <el-button link :icon="Back">{{ $t('pages.back') }}</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <Register :show="showRegister" @close="showRegister = false"></Register>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';
import { getArithmeticCode, loginByPwd } from '@/api/client/login';
import { ElMessage } from 'element-plus';
import { Encrypt } from '@/utils/Secret';
import Register from './register/index.vue';

export default defineComponent({
  name: 'Login',
  components: { Register },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const showRegister = ref<boolean>(false);
    const data = reactive({
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
      form: {
        username: '',
        password: '',
        code: '',
        key: '',
      },
      loading: false,
      imgSrc: '',
      visible: 'invisible',
      pwd_type: 'password',
      spinner: false,
    });
    const handleLogin = function () {
      const request = {
        username: data.form.username,
        password: Encrypt(data.form.password),
        code: data.form.code,
        key: store.getters.getCodeKey,
      };
      data.spinner = true;
      loginByPwd(request).then((res) => {
          store.dispatch('setUserInfo', res);
          ElMessage({ message: t('message.login_success'), type: 'success', duration: 2 * 1000 });
          router.push('/userInfo');
        }).catch(() => {
          handleArithmetic();
        }).finally(() => { data.spinner = false; });
    };
    const handleArithmetic = function () {
      data.loading = true;
      getArithmeticCode().then((res) => {
        data.imgSrc = res.img;
        store.commit('setCodeKey', res.key);
      }).catch(() => {
        data.imgSrc = '';
      }).finally(() => data.loading = false);
    };
    const toRegister = function () {
      showRegister.value = true;
    };
    const handleVisible = () => {
      if (data.visible === 'visible') {
        data.visible = 'invisible';
        data.pwd_type = 'password';
        return;
      }
      data.visible = 'visible';
      data.pwd_type = 'text';
    };
    onMounted(() => {
      handleArithmetic();
    });
    return {
      data,
      showRegister,
      handleLogin,
      handleArithmetic,
      toRegister,
      handleVisible,
      Back,
    };
  },
});
</script>

<style lang="scss" scoped>
#paper {
  min-height: 80vh;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
  margin: -5px 0;
  overflow: hidden;
  .btn_bg {
    width: 100%;
    background: #505458;
    border: none;
  }
}
.login-container {
  border-radius: 10px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px #eaeaeab6;
  box-shadow: 0 0 25px #a8a6a69f;
  .el-icon-picture-outline {
    color: #909399;
  }
  .code-div {
    font-size: 30px;
    display: flex;
    align-items: center;
    height: 100%;
  }
}
.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.el-input {
  &:deep(.el-input__suffix-inner) {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
