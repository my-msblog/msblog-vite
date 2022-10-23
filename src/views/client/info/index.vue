<template>
  <div>
    <div class="ui_banner">
      <p class="ui_title">{{ $t('pages.personal_center') }}</p>
    </div>
    <el-card class="user_info_m">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </el-col>
        <el-col :span="18" class="text_el-col name-font">
          <p class="name-p">
            {{ store.getters.getUsername }}
          </p>
          <span>
            <el-tag size="small" :type="Number(store.getters.getUserSex) === 1 ? '' : 'danger'">
              {{ sex.getSex(store.getters.getUserSex) }}
            </el-tag>
          </span>
        </el-col>
        <el-col :span="2"> <el-tag effect="dark" type="primary">{{ data.roleName }}</el-tag></el-col>
      </el-row>
    </el-card>
    <el-card class="user_info_o">
      <el-row :gutter="20">
        <el-col :span="4">
          <p class="title_info">{{ $t('pages.user_info') }} </p>
        </el-col>
        <el-col :span="18" class="text_el-col name-font" />
        <el-col :span="2" class="text_el-col name-font">
          <el-button link icon="el-icon-edit" @click="data.dialogFormVisible = true">
            {{ $t('pages.edit') }}
          </el-button>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider />
      <el-row :gutter="20">
        <el-col :span="4">
          <p class="left_title"> {{ $t('pages.phone') }}: </p>
        </el-col>
        <el-col :span="18" class="text_el-col name-font">
          <p class="name-p">
            {{ store.getters.getPhone }}
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <p class="left_title"> {{ $t('pages.email') }}: </p>
        </el-col>
        <el-col :span="18" class="text_el-col name-font">
          <p class="name-p">
            {{ store.getters.getEmail }}
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <p class="left_title"> {{ $t('pages.registration_time') }}: </p>
        </el-col>
        <el-col :span="18" class="text_el-col name-font">
          <p class="name-p">
            {{ store.getters.getUserCreateTime }}
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <p class="left_title"> {{ $t('pages.introduction') }}: </p>
        </el-col>
        <el-col :span="18" class="text_el-col name-font">
          <p class="name-p">
            {{ store.getters.getUserIntroduction }}
          </p>
        </el-col>
      </el-row>
    </el-card>
    <UserEditForm
      v-model="data.dialogFormVisible"
      :title="t('pages.edit_info')"
      :form-data="data.formData"
      @close-form="data.dialogFormVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getRole } from '@/api/client/user-info';
import { authentication } from '@/api/sys';
import { useStore } from 'vuex';
import UserEditForm from './user-edit-form/index.vue';
import { Role } from '@/constant/enums/role';
import * as sex from '@/constant/enums/sex';
import { useI18n } from 'vue-i18n';
import { isValidKey } from '@/utils/validate';

export default defineComponent({
  name: 'UserInfo',
  components: { UserEditForm },
  setup() {
    const { t } =useI18n();
    const store = useStore();
    const data = reactive({
      dialogFormVisible: false,
      formData: {
        id: store.getters.getUserId,
        username: store.getters.getUsername,
        sex: Number(store.getters.getUserSex),
        email: store.getters.getEmail,
        phone: store.getters.getPhone,
        code: '',
        introduction: store.getters.getUserIntroduction,
      },
      roleName: '',
    });
    const loadUserInfo = function() {
      authentication().then();
      getRole().then((res) => {
        if (isValidKey(res, Role)) {
          data.roleName = Role[res];
        }
        store.commit('setUserRole', res);
      });
    };
    onMounted(() => {
      loadUserInfo();
    });
    return {
      t,
      data,
      sex,
      store,
    };
  }
});
</script>

<style lang="scss" scoped>
.ui_banner{
  height: 100vh;
  overflow: hidden;
  text-align: center;
  animation: header-effect 1s;
  background-size: cover !important;
  background: #fff url('../../../assets/background/info.jpeg') no-repeat fixed center center;
  .ui_title{
    color: #fff;
    display:block;
    justify-content: center;
    margin-top: 350px;
    font-size: 24px;
    font-weight: bold;
  }
}
.user_info_m{
  max-width: $client_user_info_card_width;
  margin: 48px auto 58px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px 4px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  .el-row{
    height: auto;
  }
  .name-p{
    margin-top: 8px;
  }
  .text_el-col{
    text-align: left;
  }
  .name-font{
    font-size: 18px;
  }
}
.user_info_o{
  max-width:$client_user_info_card_width;
  margin: 0 auto 28px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  .text_el-col{
    text-align: left;
  }
  .el-divider{
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .title_info{
    font-size: 20px;
    font-weight: bold;
  }
  .left_title{
    text-align: left;
    margin-left: 20px;
  }
}
.user_info_o:hover{
  box-shadow:0 5px 8px 6px rgb(6 16 26 / 12%);
}
.user_info_m:hover{
  box-shadow:0 5px 8px 4px rgb(6 16 26 / 12%);
}
.el-card__body {
  padding: 0;
}
</style>
