<template>
  <div>
    <div class="md-top">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input
            v-model="data.input"
            size="small"
            :placeholder="$t('message.input_title')"
            clearable
          >
            <template #prepend>
              <el-select
                v-model="data.category"
                :placeholder="$t('button.select_category')"
                style="width: 110px"
              >
                <el-option
                  v-for="(item, index) in data.categoryList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            class="submit"
            type="primary"
            size="small"
            @click="handleSubmit"
          >
            {{ $t('button.submit') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="md-tabs">
      <el-select
        v-model="data.tagValues"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="(item,index) in data.tags"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <MarkDown :text="data.md" :height="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { strIsEmpty } from '@/utils';
import { BaseOptions } from '@/constant/Type';
export default defineComponent({
  name: 'ArticleWrite',
  setup() {
    const { t } = useI18n();
    const data = reactive({
      input: '',
      category: '',
      md: '# text',
      categoryList: [
        {
          label: 'das',
          value: 'ada'
        },
        {
          label: 'q',
          value: 'q'
        },
      ] as Array<BaseOptions>,
      tagValues: [],
      tags: [] as Array<BaseOptions>,
    });
    const handleSubmit = () => {
      if (strIsEmpty(data.category)){
        ElMessage.warning({
          message: t('message.category_no_null')
        });
        return;
      }
      ElMessage.success({
        message: data.category
      });
      // ElMessageBox.confirm(
      //   t('message.confirm_submit'), 
      //   t('message.confirm_submit'),
      //   {
      //     confirmButtonText: t('button.confirm'),
      //     cancelButtonText: t('button.cancel'),
      //     type: 'success',
      //   }
      // ).then();
    };
    return {
      data,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-top {
  margin-bottom: 5px;
  height: 35px;
}
.submit {
  width: 100%;
}
.md-tabs{
  padding: 3px;
}
</style>
