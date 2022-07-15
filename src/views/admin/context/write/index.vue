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
    <CommitForm :show="show" @on-show="onShow" @on-commit="onCommit"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { strIsEmpty } from '@/utils';
import { CustomOptions, SelectOptions } from '@/constant/type';
import { categoryList, tagsList, commit } from '@/api/admin/context/write';
import CommitForm from './components/CommitForm.vue';
interface Form{
  desc: string;
  cover: string;
}
export default defineComponent({
  name: 'ArticleWrite',
  components: { CommitForm },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const show = ref<boolean>(false);
    const data = reactive({
      input: '',
      category: '',
      md: '# text',
      categoryList: [] as Array<SelectOptions>,
      tagValues: [],
      tags: [] as Array<CustomOptions>,
    });
    const userId = computed<number>(() => store.getters.getUserId);
    const formEvent = {
      onShow() {
        show.value = !show.value;
      },
      onCommit(form: Form) {
        console.log(data.category);
        commit({
          title: data.input,
          text: data.md,
          tagList: data.tagValues,
          context: form.desc,
          category: Number(data.category),
          writerId: Number(userId.value),
          cover: form.cover,
        }).then(() => {
          formEvent.onShow();
        });
      }
    };
    const handleSubmit = () => {
      if (strIsEmpty(data.category)){
        ElMessage.warning({
          message: t('message.category_no_null')
        });
        return;
      }
      formEvent.onShow();
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
      show,
      ...formEvent,
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
