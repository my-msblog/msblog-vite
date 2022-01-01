<template>
  <div style="overflow: hidden">
    <div id="paper">
      <el-form
        v-loading="data.loading"
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
          <el-row justify="space-around">
            <el-col :span="14">
              <el-input
                v-model="data.form.code"
                autocomplete="off"
                :placeholder="$t('pages.verificationCode')"
              />
            </el-col>
            <el-col :span="10">
              <el-image :src="data.imgSrc" style="height: 40px" @click="handleArithmetic">
                <template #error>
                  <div style="font-size: 30px">
                    <i class="el-icon-picture-outline" @click="handleArithmetic" />
                  </div>
                </template>
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="24" justify="space-around">
            <el-col :span="11">
              <el-button type="primary" class="btn_bg" @click="handleLogin">
                {{ $t("pages.login") }}
              </el-button>
            </el-col>
            <el-col :span="11">
              <router-link to="register">
                <el-button type="primary" class="btn_bg" @click="toRegister">
                  {{ $t('pages.register') }}
                </el-button>
              </router-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <router-link to="/home">
            <el-button icon="el-icon-back" type="text">{{ $t("pages.back") }}</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getArithmeticCode, loginByPwd } from '@/api/client/login';
import { ElMessage } from 'element-plus';
import { Encrypt } from '@/utils/Secret';

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
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
    });
    const handleLogin = function () {
      // data.form.key = store.getters.getCodeKey;
      // data.form.password = Encrypt(data.form.password);
      const request = {
        username: data.form.username,
        password: Encrypt(data.form.password),
        code: data.form.code,
        key: store.getters.getCodeKey,
      };
      loginByPwd(request).then((res) => {
        store.dispatch('setUserInfo', res);
        ElMessage({
          message: t('message.login_success'),
          type: 'success',
          duration: 2 * 1000,
        });
        router.push('/userInfo');
      }).catch(() => {
        handleArithmetic();
      });
    };
    const handleArithmetic = function() {
      getArithmeticCode().then((res) => {
        data.imgSrc = res.img;
        store.commit('setCodeKey', res.key);
      });
    };
    const toRegister = function () {
      router.push('/register');
    };
    const handleVisible = () => {
      if(data.visible === 'visible'){
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
      handleLogin,
      handleArithmetic,
      toRegister,
      handleVisible,
    };
  }
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
  .btn_bg{
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
  .el-icon-picture-outline{
    color: #909399;
  }
}
.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.el-input{
  &:deep(.el-input__suffix-inner){
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
