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
                  :value="item.value"
                  :label="item.label"
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
        class="tag-select"
        multiple
        
        size="small"
        :placeholder="$t('button.select_tags')"
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
    <Markdown :text="data.md" :height="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { strIsEmpty } from '@/utils';
import { CustomOptions } from '@/constant/Type';
import { categoryList, tagsList, commit } from '@/api/admin/context/write';

export default defineComponent({
  name: 'ArticleWrite',
  setup() {
    const { t } = useI18n();
    const data = reactive({
      input: '',
      category: '',
      md: '# text',
      categoryList: [] as Array<CustomOptions>,
      tagValues: [],
      tags: [] as Array<CustomOptions>,
    });
    const handleSubmit = () => {
      if (strIsEmpty(data.category)){
        ElMessage.warning({
          message: t('message.category_no_null')
        });
        return;
      }
      ElMessageBox.confirm(
        t('message.confirm_submit'), 
        t('message.confirm_submit'),
        {
          confirmButtonText: t('button.confirm'),
          cancelButtonText: t('button.cancel'),
          type: 'success',
        }
      ).then();
    };
    watch(
      () => data.tagValues,
      () =>{
        if(data.tagValues.length > 3){
          ElMessage.warning({
            message: t('message.max_tags')
          });
          data.tagValues.pop();
        }
      } 
    );
    onMounted(()=> {
      categoryList().then(res => {
        data.categoryList = res;
      });
      tagsList().then(res => {
        data.tags = res;
      });
    });
    return {
      data,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.md-top {
  margin-bottom: 3px;
  height: 35px;
}
.submit {
  width: 100%;
}
.md-tabs{
  padding: 3px;
  .tag-select{
    width: 100%;
  }
}
</style>
