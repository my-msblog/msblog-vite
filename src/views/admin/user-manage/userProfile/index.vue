<template>
  <div>
    <UserTable
      :tableData="data.tableData"
      :current-page="data.currentPage"
      :page-size="data.pageSize"
      :total="data.total"
      @currentPage="handleCurrentPage"
      @sizeChange="handleCurrentPage"
      @edit="handleEdit"
      @deleted="handleDelete"
      @deletedList="handleDeleteList"
      class="u_form" />
  </div>

  <EditForm
    v-if="data.editFormShow"
    v-model="data.editFormShow"
    :title="$t('pages.edit_info')"
    @close="data.editFormShow = false"
    @afterChange="handleCurrentPage(data.pagination)"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  provide,
} from 'vue';
import { adminUserPage, deletedUser } from '@/api/admin/user-profile';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { BaseDTO } from '@/api/model/core';
import { UserProfileVO, UserProfileVOImpl } from '@/api/model/admin/user-profile';
import EditForm from './components/EditForm.vue';
import UserTable from './components/UserTable.vue';

export default defineComponent({
  name: 'UserProfile',
  components: { UserTable, EditForm },
  setup() {
    const { t } = useI18n();
    const data = reactive({
      editFormShow: false,
      tableData: [] as UserProfileVO[],
      currentPage: 1,
      pagination: {
        page: 1,
        size: 5,
      } as BaseDTO,
      total: 10,
      pageSize: 5,
    });
    let editData = ref(new UserProfileVOImpl);

    const handleUserPage = function (pagination: BaseDTO) {
      data.pagination = pagination;
      adminUserPage(data.pagination).then((res) => {
        data.tableData = res.list;
        data.currentPage = res.pageNum;
        data.pageSize = res.pageSize;
        data.total = res.total;
      });
    };
    const handleDelete = function (id: number) {
      deletedUser({ id: id }).then(() => {
        handleUserPage(data.pagination);
        ElMessage.success({
          message: t('message.operation_success'),
          type: 'success'
        });
      });
    };
    const handleCurrentPage = function (pagination: BaseDTO) {
      handleUserPage(pagination);
    };
    const handleDeleteList = function () {
      handleUserPage(data.pagination);
    };
    const handleEdit = function (form: UserProfileVO) {
      data.editFormShow = true;
      editData.value = form;
    };
    onMounted(() => {
      handleUserPage(data.pagination);
    });
    provide('editData', editData);
    return {
      data,
      handleEdit,
      handleUserPage,
      handleCurrentPage,
      handleDelete,
      handleDeleteList,
    };
  }
});
</script>

<style>
.u_form{
  margin-top: 15px;
}
</style>
